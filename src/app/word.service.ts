import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from './word';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }
  getWordsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'word-list');
  }
  createWord(word: Word): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}` + 'save-word', JSON.stringify(word), httpOptions);
  }

  updateWord(word: Word): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}` + 'update-word', JSON.stringify(word), httpOptions);
  }

  deleteWord(word: Word): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}` + 'delete-word', JSON.stringify(word), httpOptions);
  }
}
