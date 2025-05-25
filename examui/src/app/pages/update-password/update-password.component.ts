import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { SharedMaterialModule } from '../../shared-material.module';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-update-password',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _userService = inject(UserService);
  private _snack = inject(MatSnackBar);
  private _router = inject(Router);
  private _login = inject(LoginService);


  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  username: any;
  user: any;

  oldPassword: any;
  newPassword: any;
  confirmNewPassword: any;

  isVerified: boolean = false;

  ngOnInit(): void {
    this.username = this._route.snapshot.params['username'];

    this.user = this._userService.getSingleUser(this.username).subscribe(
      (data: any) => {
        this.user = data;
      },
      (error) => {
        this.showSnackbar("Error while fetching user data!!");
      }
    );
  }

  showSnackbar(message: string, duration: number = 3000) {
    this._snack.open(message, "Close", { duration });
    return;
  }


  updatePassword() {

    // verify the old password first
    this._userService.verifyPassword(this.oldPassword, this.user).subscribe(
      (isValid: boolean) => {
        this.isVerified = isValid;

        if (this.isVerified) {

          // checking the newPassword and conformNewPassword, whether they are same or not
          if (this.newPassword === this.confirmNewPassword && !(this.newPassword == '' || this.newPassword == null || this.confirmNewPassword == '' || this.confirmNewPassword == null)) {
            if (this.newPassword === this.oldPassword) {
              this.showSnackbar("Old Password and New Password should not be the same.");
              return;
            }

            // update the password
            this._userService.updatePassword(this.newPassword, this.user).subscribe(
              (data: any) => {
                Swal.fire("Success!!", "Password updated successfully", "success").then(
                  () => {
                    const userRole = this._login.getUserRole();

                    // Navigate based on role
                    if (userRole === 'ADMIN') {
                      this._router.navigate(['/admin/profile']); // Admin route
                    } else if (userRole === 'NORMAL') {
                      this._router.navigate(['/user-profile']); // Normal user route
                    }
                  }
                );
              },
              (error) => {
                Swal.fire("Error!!", "Error while updating password.", "error");
                console.log(error);
              }
            );

          }
          else {
            this.showSnackbar("New Password and Confirm Password should be the same and not empty.");
          }
        }
        else {
          if (this.oldPassword == '' || this.oldPassword == null) {
            this.showSnackbar("Old Password is required!!");
          }
          else {
            this.showSnackbar("Old Password is incorrect!!");
          }
        }
      },
      (error) => {
        this.showSnackbar("Old Password verification failed!!");
      }
    );

  }

}
