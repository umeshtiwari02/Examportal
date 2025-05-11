import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SharedMaterialModule,
    SidebarComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
