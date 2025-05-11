import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SharedMaterialModule } from '../../shared-material.module';


@Component({
  selector: 'app-profile',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private login = inject(LoginService)

  user: any;

  ngOnInit(): void {
    this.user = this.login.getUser();
  }


}
