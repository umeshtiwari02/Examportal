import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _category = inject(CategoryService);
  private _snack = inject(MatSnackBar);
  private _router = inject(Router);

  cid = 0;
  category: any = [];

  ngOnInit(): void {

    this.cid = this._route.snapshot.params['cid'];

    this._category.getCategory(this.cid).subscribe(
      (data: any) => {
        this.category = data;
        console.log(this.category);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCategory() {
    // validation
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open("Title required!!", "", {
        duration: 3000
      });
      return;
    }

    // updating category data
    this._category.updateCategory(this.category).subscribe(
      (data: any) => {
        Swal.fire("Success !!", "Category updated successfully.", "success").then(
          (next) => this._router.navigate([`/admin/categories`])
        );
      },
      (error) => {
        Swal.fire("Error !!", "Error while updating category.", "error");
        // console.log(error);
      }
    );
  }
}
