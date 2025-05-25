import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SharedMaterialModule } from '../../shared-material.module';


@Component({
  selector: 'app-profile',
  imports: [
    SharedMaterialModule,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  public login = inject(LoginService)

  user: any;

  ngOnInit(): void {
    // this.user = this._login.getUser();

    this.login.getCurrentUser().subscribe(
      (data: any) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
