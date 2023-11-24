import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, User } from '@/types';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(`auth/login`, {
        email,
        password,
      })
      .pipe(tap((resp) => this.tokenService.setUserToken(resp.access_token)));
  }
  getProfile() {
    return this.http.get<User>(`auth/profile`);
  }
}
