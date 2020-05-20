import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
          if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                  return throwError(error.statusText);
              }
              const applicationError = error.headers.get('Application-Error');
              if (applicationError) {
                  console.log(applicationError);
                  return throwError (applicationError);
              }
              const serverError = error.error; // 来自服务器API的错误
              let modalStateErrors = '';
              if (serverError && typeof serverError === 'object') {
                  for (const key in serverError) {
                   if (serverError[key]) {
                       modalStateErrors += serverError[key] + '\n';
                   }
                  }
              }
              return throwError(modalStateErrors || serverError || 'Server Error');
          }

      })
  );
  }
}
