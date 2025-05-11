import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {
  constructor() { }

  private _categ = inject(CategoryService);
  private _snack = inject(MatSnackBar);
  private _quizser = inject(QuizService);
  categories: any = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: null
  };

  ngOnInit(): void {
    this._categ.categories().subscribe(
      (data: any) => {
        this.categories = data;
        // console.log(this.categories);
      },
      (error) => {
        // console.log(error);
        Swal.fire("Error !!", "Error in loading data from server.", "error");
      }
    );
  }


  addQuiz() {

    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open("Title is required!!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quizData.description.trim() == '' || this.quizData.description == null) {
      this._snack.open("Description is required!!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null) {
      this._snack.open("Maximum marks is required!!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quizData.numberOfQuestions.trim() == '' || this.quizData.numberOfQuestions == null) {
      this._snack.open("Number of questions is required!!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quizData.category == '' || this.quizData.category == null) {
      this._snack.open("Category is required!!", "Ok", {
        duration: 3000
      });
      return;
    }


    // call server
    this._quizser.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire("Success !!", "Quiz added successfully.", "success");
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: null
        };
      },
      (error) => {
        Swal.fire("Error !!", "Error while adding quiz.", "error");
        // console.log(error);
      }
    );
  }
}
