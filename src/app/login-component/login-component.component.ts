import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../login-request';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  constructor(private authservice: AuthService) { }
  username: String = "";
  password: String = "";
  loginRequest: LoginRequest = new LoginRequest("", "");
  validLogin: boolean = false;
  loginform = new FormGroup({
    login_username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    login_password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  tryLogin() {
    this.password = this.PasswordValue?.value ?? "";
    this.username = this.UsernameValue?.value ?? "";
    this.loginRequest.password = this.password;
    this.loginRequest.username = this.username;
    this.authservice.login(this.loginRequest);
  }
  get UsernameValue() {
    return this.loginform.get('login_username');
  }
  get PasswordValue() {
    return this.loginform.get('login_password');
  }
}
