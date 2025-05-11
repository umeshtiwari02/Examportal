import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { SharedMaterialModule } from '../../shared-material.module';

@Component({
  selector: 'app-signup',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService: UserService, private _snack: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  formSubmit() {
    // console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this._snack.open("Username is required!!", "Ok", {
        duration: 3000,
        // verticalPosition: "bottom",
        // horizontalPosition: "end"
      });
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this._snack.open("Password is required!!", "Ok", {
        duration: 3000
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

    // addUser : userservice
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        // success
        Swal.fire("Success", "User id " + data.id + " registered successfully.", "success");
        // console.log(data);
      },
      (error) => {
        // error
        this._snack.open("User with this username is already there in DB. Try with new username!!", "Ok", {
          duration: 3000
        });
        // console.log(error);
      }
    );
  }

}