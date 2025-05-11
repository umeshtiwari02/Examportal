import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedMaterialModule } from '../../../shared-material.module';

@Component({
  selector: 'app-load-quiz',
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit {

  cId: any;
  quizzes: any = [];

  private _route = inject(ActivatedRoute);
  private _quizService = inject(QuizService);
  private _snack = inject(MatSnackBar);

  ngOnInit(): void {

    this._route.params.subscribe(
      (params) => {
        this.cId = params['cid'];

        if (this.cId == 0) {
          this._quizService.getActiveQuizzes().subscribe(

            (data: any) => {
              this.quizzes = data;
              // console.log(this.quizzes);
            },
            (error) => {
              // console.log(error);
              this._snack.open("Error while loading quizzes.", "", {
                duration: 3000
              });
            }
          );
        }
        else {
          // console.log("Load specific quiz.");

          this._quizService.getActiveQuizzesOfCategory(this.cId).subscribe(
            (data: any) => {
              this.quizzes = data;
            },
            (error) => {
              console.log(error);
              this._snack.open("Error while getting quizzes of category.", "", {
                duration: 3000
              });
            }
          );
        }
      }
    );
  }
}
