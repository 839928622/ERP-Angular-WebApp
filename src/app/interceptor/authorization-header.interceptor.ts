import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.userAvailable) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.authService.user.token_type} ${this.authService.user.access_token}`
        }
      });
    }
    return next.handle(request);
  }
}
