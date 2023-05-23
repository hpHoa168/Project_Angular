import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  loginFailed: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  checkLogin() {
    if (this.userName === 'hoang4326' && this.password === '123456') {
      this.loginService.setLogin();
      this.router.navigate(['/home']);
    } else {
      this.loginFailed = 'Username or Password incorrect!';

      setTimeout(() => {
        this.loginFailed = '';
      }, 2000);
    }
  }

  demoLogin() {
    this.userName = 'hoang4326';
    this.password = '123456';
  }
}
