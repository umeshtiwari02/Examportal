import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SharedMaterialModule } from '../../shared-material.module';

@Component({
  selector: 'app-navbar',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public login = inject(LoginService);

  isLoggedIn = false;
  user = null;

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
    // throw new Error('Method not implemented.');
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
