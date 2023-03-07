import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from './login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl = 'http://localhost:8080/api/auth/';
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private admin: boolean = false;

  login(loginRequest: LoginRequest): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      withCredentials: true,
      headers: headers
    };
    return this.http.post<boolean>(this.baseUrl + 'login', loginRequest, options).pipe(
      response => {
        response.subscribe(value => {
          this.isLoggedIn$.next(value);
          this.admin = value;
          if (value) {
            this.router.navigate(['/edit-words']);
          }
        })
        return this.isLoggedIn$;
      }
    );
  }
  get isAdmin() {
    return this.admin;
  }
  isLoggedIn(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      withCredentials: true,
      headers: headers
    };
    return this.http.get<boolean>(this.baseUrl + 'login-status', options).pipe(
      response => {
        response.subscribe(value => {
          this.isLoggedIn$.next(value);
          console.log(value)
        })
        return this.isLoggedIn$;
      }
    );
  }
  logout(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      withCredentials: true,
      headers: headers
    };
    console.log("logout");

    return this.http.post<boolean>(this.baseUrl + 'logout', options).pipe(
      response => {
        response.subscribe(value => {
          this.router.navigate(['/start-screen']);
        })
        this.isLoggedIn$.next(false);
        this.admin = false;
        return this.isLoggedIn$;
      }
    );
  }
}
