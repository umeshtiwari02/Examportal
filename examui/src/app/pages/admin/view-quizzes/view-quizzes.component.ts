import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {

  private _quiz = inject(QuizService);

  quizzes: any = [];

  constructor() { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        // console.log(this.quizzes);
      },
      (error) => {
        // console.log(error);
        Swal.fire("Error !!", "Error in loading data.", "error");
      }
    );
  }

  // delete quiz
  deleteQuiz(qid: any) {
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
          this._quiz.deleteQuiz(qid).subscribe(
            (data) => {
              this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qid);
              Swal.fire("Success !!", "Quiz deleted successfully.", "success");
            },
            (error) => {
              Swal.fire("Error !!", "Error while deleting quiz.", "error");
            }
          );

        }
      }
    );
  }
}
