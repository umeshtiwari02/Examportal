import { Component, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LocationStrategy } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    SharedMaterialModule,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private locationStrategy: LocationStrategy,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.setupBackButtonPrevention();
  }

  private setupBackButtonPrevention() {
    // Push current state initially
    history.pushState(null, '', location.href);

    this.locationStrategy.onPopState(() => {
      // Check if we're trying to go back to login
      if (this.router.url.includes('login')) {
        history.pushState(null, '', location.href);
      }
      // Allow normal back navigation for other cases
    });

    // Additional protection against direct URL entry
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('login') && this.loginService.isLoggedIn()) {
          this.router.navigate(['/admin']);
        }
      }
    });
  }
}