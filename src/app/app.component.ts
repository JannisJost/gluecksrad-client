import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gluecksrad-client';

  constructor(protected authService: AuthService, private router: Router) { }

  get LoginStatus() {
    return this.authService.isAdmin ? "Logout" : "Login";
  }
  logInOrOut() {
    this.authService.isAdmin ? this.authService.logout() : this.router.navigate(['/admin-login']);
  }

}
