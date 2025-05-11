import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  private _http = inject(HttpClient);

  // get single question
  public getQuestion(qid: any) {
    return this._http.get(`${baseUrl}/question/${qid}`);
  }

  // get questions of quiz
  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  // get questions of quiz for test
  public getQuestionsOfQuizForTest(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  // add question
  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  // delete question
  public deleteQuestion(qid: any) {
    return this._http.delete(`${baseUrl}/question/${qid}`);
  }

  // update question
  public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }

  // evaluate quiz
  public evaluateQuiz(questions: any) {
    return this._http.post(`${baseUrl}/question/evaluate-quiz`, questions);
  }
}
