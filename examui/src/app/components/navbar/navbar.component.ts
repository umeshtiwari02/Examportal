import { Component, HostListener, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SharedMaterialModule } from '../../shared-material.module';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  isLoggedIn = false;
  user = null;

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isRegisterPage(): boolean {
    return this.router.url === '/signup';
  }

  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }

  profileMenuOpen = false;

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  // Close profileMenuO when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.profile-menu-container')) {
      this.profileMenuOpen = false;
    }
  }
}
