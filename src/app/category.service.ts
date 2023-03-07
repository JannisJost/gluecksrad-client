import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }
  getCategoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'category-list');
  }
  createCategory(category: Category): Observable<object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log("saving category");
    return this.http.post(`${this.baseUrl}` + 'add-category', JSON.stringify(category), httpOptions);
  }
  updateCategory(category: Category): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}` + 'update-category', JSON.stringify(category), httpOptions);
  }
}
