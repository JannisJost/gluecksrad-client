import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameRecord } from './game-record';

@Injectable({
  providedIn: 'root'
})
export class GameRecordService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }
  getGameRecordList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'gamerecord-list');
  }
  deleteGameRecord(record: GameRecord): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {
      withCredentials: true,
      headers: headers
    };
    return this.http.post(`${this.baseUrl}` + 'delete-record', JSON.stringify(record), options);
  }
}
