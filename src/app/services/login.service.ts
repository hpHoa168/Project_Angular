import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogin: boolean = false;
  constructor() { }

  setLogin(){
    this.isLogin = true;
  }

  setLogout(){
    this.isLogin = false;
  }

}
