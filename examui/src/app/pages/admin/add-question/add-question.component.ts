import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _snack = inject(MatSnackBar);
  private _question = inject(QuestionService);

  qid = 0;
  qtitle = '';
  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qtitle = this._route.snapshot.params['title'];
    this.question.quiz['qid'] = this.qid;
    // console.log(this.qid);
  }

  formSubmit() {
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

    // form submit
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        // console.log(data);

        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
        Swal.fire("Success !!", "Question added successfully.", "success");
      },
      (error) => {
        Swal.fire("Error !!", "Error while adding a question.", "error");
      }
    );


  }

}
