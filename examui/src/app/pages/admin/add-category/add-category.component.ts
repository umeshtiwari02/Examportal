import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  category = {
    title: '',
    description: ''
  };

  formSubmit() {
    // validation
    if (this.category.title.trim() == '' || this.category.title == null) {

      this._snack.open("Title required!!", "", {
        duration: 3000
      });
      return;
    }

    // adding new category
    this._category.addCategory(this.category).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Category is added successfully!', 'success');
        this.category.title = '';
        this.category.description = '';
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Server error.', 'error');
      }
    );
  }

}
