import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, User } from '@/types';
import { TokenService } from './token.service';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from '../store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  // creamos un subscriptor
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private storeService: StoreService,
    private $router: Router
  ) {}

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(`auth/login`, {
        email,
        password,
      })
      .pipe(tap((resp) => this.tokenService.setUserToken(resp.access_token)));
  }
  logout() {
    // this.storeService.removeUserData();
    this.user.next(null);
    this.tokenService.removeToken();
    this.$router.navigate(['home']);
  }

  getProfile() {
    return this.http
      .get<User>(`auth/profile`)
      .pipe(tap((profile) => this.user.next(profile)));
  }

  loginAndGetProfile({ email, password }: { email: string; password: string }) {
    return this.login({ email, password }).pipe(
      switchMap(() => this.getProfile())
    );
  }
}
