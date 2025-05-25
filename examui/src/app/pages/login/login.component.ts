import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedMaterialModule } from '../../shared-material.module';


@Component({
  selector: 'app-login',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  loginData = {
    username: "",
    password: ""
  }

  loginFormSubmit() {

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required !!", "", {
        duration: 3000
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required !!", "", {
        duration: 3000
      });
      return;
    }

    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        // console.log('Success');
        // console.log(data);

        // login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            // console.log(user);

            // redirect ...ADMIN: admin-dashboard
            // redirect ...NORMAL: normal-dashbaord
            if (this.login.getUserRole() == "ADMIN") {
              // admin dashboard
              // window.location.href = "/admin";
              this.router.navigate(["admin"]);
              this.login.loginStatusSubject.next(true);
            }
            else if (this.login.getUserRole() == "NORMAL") {
              // normal user-dashboard
              // window.location.href = "/user-dashboard";
              this.router.navigate(["user-dashboard/0"]);
              this.login.loginStatusSubject.next(true);
            }
            else {
              this.login.logout();
            }
          },
          (userError) => {
            this.snack.open("Failed to fetch user details. Please try again.", "OK", {
              duration: 3000
            });
            this.login.logout();
          }
        );

      },
      (error) => {

        let errorMessage = "Invalid Details. Try again!!";

        // Handle different error cases
        if (error.status === 0) {
          errorMessage = "Server is not responding. Please try again later.";
        } else if (error.status === 401) {
          errorMessage = "Invalid username or password!";
        } else if (error.status >= 500) {
          errorMessage = "Server error occurred. Please contact support.";
        }

        this.snack.open(errorMessage, "OK", {
          duration: 3000
        });
      }
    );

  }
}
