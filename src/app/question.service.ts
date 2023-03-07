import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }
  getQuestionList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'question-list');
  }
  createQuestion(question: Question): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}` + 'save-question', JSON.stringify(question), httpOptions);
  }

  updateQuestion(question: Question): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}` + 'update-question', JSON.stringify(question), httpOptions);
  }

  deleteQuestion(question: Question): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}` + 'delete-question', JSON.stringify(question), httpOptions);
  }
}
