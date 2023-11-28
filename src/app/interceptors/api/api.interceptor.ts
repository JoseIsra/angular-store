import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

const COMMON_API = new HttpContextToken<boolean>(() => true);

export function disableCommonApi() {
  return new HttpContext().set(COMMON_API, false);
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  API = environment.API_URL;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.context.get(COMMON_API)) {
      return next.handle(request);
    }
    const apiReq = request.clone({ url: `${this.API}/${request.url}` });
    return next.handle(apiReq);
  }
}
