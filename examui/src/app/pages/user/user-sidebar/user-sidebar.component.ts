import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-sidebar',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit {


  categories: any;
  private _category = inject(CategoryService);
  private _snack = inject(MatSnackBar);

  ngOnInit(): void {

    this._category.categories().subscribe(

      (data: any) => {
        this.categories = data;
        // console.log("Data ::: ",this.categories);
      },
      (error) => {
        this._snack.open("Error occurred while loading data.", "", {
          duration: 3000
        });
      }
    );

  }


}
