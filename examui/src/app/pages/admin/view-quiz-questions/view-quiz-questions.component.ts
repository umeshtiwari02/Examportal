import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { SharedMaterialModule } from '../../../shared-material.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _question = inject(QuestionService);

  qId = 0;
  qTitle = '';
  questions: any = [];


  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // console.log("ID : ", this.qId, ", TITLE : ", this.qTitle);

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // deleting question
  deleteQuestion(qid: any) {

    Swal.fire({
      icon: 'info',
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'Red'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          // delete
          this._question.deleteQuestion(qid).subscribe(
            (data: any) => {
              Swal.fire("Success !!", "Question deleted successfully.", "success");
              this.questions = this.questions.filter((q: any) => q.qid != qid);
            },
            (error) => {
              Swal.fire("Error !!", "Error while deleting question.", "error");
            }
          );
        }
      }
    );
  }


}
