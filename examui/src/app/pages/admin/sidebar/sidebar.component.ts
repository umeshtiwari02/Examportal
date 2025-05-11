import { Component, inject } from '@angular/core';
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

}
