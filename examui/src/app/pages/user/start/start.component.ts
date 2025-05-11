import { LocationStrategy } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { SharedMaterialModule } from '../../../shared-material.module';

@Component({
  selector: 'app-start',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {

  qId = 0;
  questions: any = [];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;
  timer: any = 0;

  private _locStrategy = inject(LocationStrategy);
  private _route = inject(ActivatedRoute);
  private _questionService = inject(QuestionService);


  ngOnInit(): void {
    this.preventBackButton();

    this.qId = this._route.snapshot.params['qid'];

    this.loadQuestions();
  }


  loadQuestions() {
    this._questionService.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        this.startTimer();
        console.log(this.questions);
      },
      (error) => {
        // console.log(error);
        Swal.fire("Error !!", "Error in loading questions of quiz.", "error");
      }
    );
  }


  submitQuiz() {

    Swal.fire({
      icon: "info",
      title: "Do you want to submit the quiz?",
      confirmButtonText: "Submit",
      showCancelButton: true
    }).then(
      (result) => {
        if (result.isConfirmed) {

          this.evaluateQuiz();

          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Quiz submitted!",
            text: "Your detailed results are ready.",
            showConfirmButton: false,
            timer: 2000
          }).then(
            (r) => {
              this.isSubmit = true;
            }
          );
        }
      }
    );
  }

  evaluateQuiz() {

    // call to server to check questions
    this._questionService.evaluateQuiz(this.questions).subscribe(
      (data: any) => {
        // console.log(data);
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;

        // Round FINAL value to 2 decimals
        this.marksGot = parseFloat(this.marksGot.toFixed(2));
      },
      (error) => {
        console.log(error);
      }
    );

    // calculation for testing to show the result
    // this.questions.forEach(
    //   (q: any) => {
    //     if (q.answer == q.givenAnswer) {
    //       this.correctAnswers++;
    //       let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //       this.marksGot += marksSingle;
    //     }

    //     if (q.givenAnswer.trim() != '') {
    //       this.attempted++;
    //     }
    //   }
    // );
    // // Round FINAL value to 2 decimals (after loop)
    // this.marksGot = parseFloat(this.marksGot.toFixed(2));
  }


  startTimer() {
    let t = window.setInterval(() => {
      // calling in everysecond
      if (this.timer <= 0) {
        this.evaluateQuiz();
        this.isSubmit = true;
        clearInterval(t);
      }
      else {
        this.timer--;
      }
    }, 1000);
  }


  getFormattedTime() {
    let minutes = Math.floor(this.timer / 60);
    let seconds = this.timer - minutes * 60;

    return `${minutes} min : ${seconds} sec`;
  }


  printPage() {
    window.print();
  }


  preventBackButton() {
    history.pushState(null, '', location.href);
    this._locStrategy.onPopState(
      () => {
        history.pushState(null, '', location.href);
      }
    );
  }
}
