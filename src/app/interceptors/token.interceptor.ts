import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@/services/auth/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('tento token?', this.tokenService.userToken);
    return next.handle(this.addToken(request));
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.userToken;
    if (token.length > 0) {
      const authReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.tokenService.userToken}`
        ),
      });
      return authReq;
    }
    return request;
  }
}
