import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { SharedMaterialModule } from '../../../shared-material.module';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit {

  constructor() { }

  private _route = inject(ActivatedRoute);
  private _quiz = inject(QuizService);
  private _category = inject(CategoryService);
  private _snack = inject(MatSnackBar);
  private _router = inject(Router);

  qid = 0;
  quiz: any;
  categories: any;

  ngOnInit(): void {

    this.qid = this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        // console.log(error);
        Swal.fire("Error !!", "Error in loading data.", "error");
      }
    );

    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire("Error !!", "Error in loading categories.", "error");
      }
    );
  }

  // update form submit
  updateQuizData() {
    // validating data
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open("Title is required!!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this._snack.open("Description is required!!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null) {
      this._snack.open("Maximum marks is required!!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null) {
      this._snack.open("Number of questions is required!!", "Ok", {
        duration: 3000
      });
      return;
    }


    // updating data here
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire("Success !!", "Quiz updated successfully.", "success").then(
          (next) => this._router.navigate(['/admin/quizzes'])
        );
      },
      (error) => {
        Swal.fire("Error !!", "Error while updating quiz.", "error");
        // console.log(error);
      }
    );
  }
}
