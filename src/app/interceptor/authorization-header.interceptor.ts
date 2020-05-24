import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OidcFacade } from 'ng-oidc-client';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

  constructor( private oidcFacade: OidcFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.oidcFacade.identity$.pipe(
      switchMap(user => {
        if (user && !user.expired && user.access_token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${user.access_token}`
            }
          });
        }
        return next.handle(request);
      })
    );
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
