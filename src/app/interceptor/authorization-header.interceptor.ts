import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

  constructor(  private oidcSecurityServices: OidcSecurityService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${ this.oidcSecurityServices.getToken()}`
            }
          });

          return next.handle(request);

    // if (this.authService.userAvailable) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `${this.authService.user.token_type} ${this.authService.user.access_token}`
    //     }
    //   });
    // }
    // return next.handle(request);
  }
}
