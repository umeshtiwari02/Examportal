import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [
    SharedMaterialModule,
    UserSidebarComponent
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
