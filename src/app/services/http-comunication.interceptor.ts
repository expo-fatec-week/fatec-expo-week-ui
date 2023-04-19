import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpComunicationInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenService.getToken() && !request.url.includes('/login')) {
      request = request.clone({
        setHeaders: { 'Authorization': `Bearer ${this.tokenService.getToken()}` }
      });
    }

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status >= 400 && error.status < 500) {
              this.alertService.warning(error.error.message);
              if (error.status === 401) {
                this.router.navigateByUrl('');
              }
            } else {
              this.alertService.error(error.error.message);
            }
          }
          return throwError(error.error.message);
        })
      );
  }
}
