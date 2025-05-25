import { Component, HostListener, inject } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public login = inject(LoginService);

  public logout() {
    this.login.logout();
    window.location.reload();
  }


   // for mobile usr
   sidebarVisible: boolean = false;

   toggleSidebar() {
     this.sidebarVisible = !this.sidebarVisible;
   }

   closeSidebarOnMobile() {
     if (window.innerWidth <= 768) {
       this.sidebarVisible = false;
     }
   }

   // Close sidebar when clicking outside
   @HostListener('document:click', ['$event'])
   onClick(event: MouseEvent) {
     const target = event.target as HTMLElement;
     if (!target.closest('.sidebar-card') && !target.closest('.mobile-menu-button')) {
       this.sidebarVisible = false;
     }
   }

}
