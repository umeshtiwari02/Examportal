import { Component, inject, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit {

  qId: any = 0;
  quiz: any = [];

  private _route = inject(ActivatedRoute);
  private _quizService = inject(QuizService);
  private _snack = inject(MatSnackBar);
  private _router = inject(Router);

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    // console.log(this.qId);

    this._quizService.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        // console.log(this.quiz);
      },
      (error) => {
        // console.log(error);
        this._snack.open("Error in loading quiz data.", "", {
          duration: 3000
        });
      }
    );
  }

  // start quiz
  startQuiz() {
    Swal.fire({
      icon: "info",
      title: "Do you want to start the quiz?",
      confirmButtonText: "Start",
      showCancelButton: true
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this._router.navigate(['/start/' + this.qId]);
        }
      }
    );
  }
}
