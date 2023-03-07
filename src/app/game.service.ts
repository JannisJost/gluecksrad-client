import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl = 'http://localhost:8080/api/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  options = {
    withCredentials: true,
    headers: this.headers
  };
  constructor(private http: HttpClient) { };
  getGame(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'current-game', { withCredentials: true });
  }
  spin() {
    return this.http.get(`${this.baseUrl}` + 'spin', { withCredentials: true })
  }
  guessChar(guess: String): Observable<any> {
    return this.http.post(`${this.baseUrl}` + 'guess-char', JSON.stringify(guess), this.options);
  }

  answerQuestion(answer: String): Observable<any> {
    return this.http.post(`${this.baseUrl}` + 'answer-question', JSON.stringify(answer), this.options);
  }

  setQuestionAmount(amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}` + 'set-amount', JSON.stringify(amount), this.options);
  }
  skipVowelShopping(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'skip-vowel-shopping', { withCredentials: true });
  }

  saveGame(playername: String): Observable<any> {
    return this.http.post(`${this.baseUrl}` + 'save-game', JSON.stringify(playername), this.options);
  }

  newGame(): Observable<any> {
    return this.http.post(`${this.baseUrl}` + 'new-game', this.options);
  }

  cancelSave(): Observable<any> {
    return this.http.post(`${this.baseUrl}` + 'reset-game', this.options);
  }
}
