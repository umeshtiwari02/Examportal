import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { SharedMaterialModule } from '../../../shared-material.module';


@Component({
  selector: 'app-view-categories',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})


export class ViewCategoriesComponent implements OnInit {

  constructor(private category: CategoryService) { }

  categories: any = []

  ngOnInit(): void {
    this.category.categories().subscribe((data: any) => {

      this.categories = data;
      // console.log(this.categories);
    },
      (error) => {
        Swal.fire("Error !!", "Error in loading data.", "error");
        // console.log(error);
      }

    );
  }

  deleteCategory(cid: any) {
    Swal.fire({
      icon: "info",
      title: "Are you sure?",
      confirmButtonText: "Delete",
      confirmButtonColor: "Red",
      showCancelButton: true
    }).then(
      (result) => {

        if (result.isConfirmed) {
          // deleting quiz
          this.category.deleteCategory(cid).subscribe(
            (data) => {
              this.categories = this.categories.filter((c: any) => c.cid != cid);
              Swal.fire("Success !!", "Category deleted successfully.", "success");
            },
            (error) => {
              Swal.fire("Error !!", "Error while deleting category.", "error");
            }
          );

        }
      }
    );
  }

  updateCategory(category: any) {
    alert("Update");
  }
}
