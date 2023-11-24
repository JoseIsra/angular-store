import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  userToken = localStorage.getItem('t') || '';

  setUserToken(token: string) {
    this.userToken = token;
    localStorage.setItem('t', token);
  }

  removeToken() {
    this.userToken = '';
    localStorage.removeItem('t');
  }
}
