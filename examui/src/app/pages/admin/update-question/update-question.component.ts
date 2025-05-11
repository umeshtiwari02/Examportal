import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-question',
  imports: [SharedMaterialModule],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _question = inject(QuestionService);
  private _snack = inject(MatSnackBar);
  private _router = inject(Router);

  qId = 0;
  question: any = [];


  ngOnInit(): void {


    this.qId = this._route.snapshot.params['qid'];

    this._question.getQuestion(this.qId).subscribe(
      (data: any) => {
        this.question = data;
        // console.log(this.question);
      },
      (error) => {
        // console.log(error);
        Swal.fire("Error !!", "Error in loading data.", "error");
      }
    );
  }

  // update form submit
  updateQuestion() {
    // validating
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open("Content is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this._snack.open("Option1 is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this._snack.open("Option2 is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this._snack.open("Answer is required!", "Ok", {
        duration: 3000
      });
      return;
    }

    // update data here
    this._question.updateQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire("Success !!", "Question updated successfully.", "success").then(
          (next) => this._router.navigate([`/admin/view-questions/${this.question.quiz.qid}/${this.question.quiz.title}`])
        );
      },
      (error) => {
        Swal.fire("Error !!", "Error while updating question.", "error");
        // console.log(error);
      }
    );
  }
}
