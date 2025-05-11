import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../shared-material.module';

@Component({
  selector: 'app-home',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
