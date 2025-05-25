import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { SharedMaterialModule } from '../../shared-material.module';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-update-user',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _userService = inject(UserService);
  private _snack = inject(MatSnackBar);
  private _router = inject(Router);
  private _login = inject(LoginService);

  username: any;
  user: any;

  ngOnInit(): void {
    this.username = this._route.snapshot.params['username'];

    this.user = this._userService.getSingleUser(this.username).subscribe(
      (data: any) => {
        this.user = data;
      },
      (error) => {
        this._snack.open("Error while fetching user data!!", "", {
          duration: 3000
        });
      }
    );

  }

  updateUserDetails() {
    // validating the field
    if (this.user.username == '' || this.user.username == null) {
      this._snack.open("Username is required!!", "Ok", {
        duration: 3000,
      });
      return;
    }
    if (this.user.firstName == '' || this.user.firstName == null) {
      this._snack.open("First Name is required!!", "Ok", {
        duration: 3000
      });
      return;
    }
    if (this.user.lastName == '' || this.user.lastName == null) {
      this._snack.open("Last Name is required!!", "Ok", {
        duration: 3000
      });
      return;
    }
    if (this.user.email == '' || this.user.email == null) {
      this._snack.open("Email is required!!", "Ok", {
        duration: 3000
      });
      return;
    }
    if (this.user.phone == '' || this.user.phone == null) {
      this._snack.open("Phone number is required!!", "Ok", {
        duration: 3000
      });
      return;
    }

    // update user data
    this._userService.updateUser(this.user).subscribe(
      (data: any) => {
        // success
        Swal.fire("Success", "User updated successfully.", "success").then(
          () => {
            const userRole = this._login.getUserRole();

            // Navigate based on role
            if (userRole === 'ADMIN') {
              this._router.navigate(['/admin/profile']); // Admin route
            } else if (userRole === 'NORMAL') {
              this._router.navigate(['/user-profile']); // Normal user route
            }
          });
      },
      (error) => {
        // error
        this._snack.open("Error while updating user data!!", "Ok", {
          duration: 3000
        });
      }
    );
  }



}
