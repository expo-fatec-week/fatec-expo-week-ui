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

@Injectable()
export class HttpComunicationInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private tokenService: TokenService
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
              if (error.error?.length > 0) {
                this.alertService.warning(error.error);
              } else {
                this.alertService.warning(error.error.message);
              }
              if (error.error === 'Unauthorized' || error.error.message === 'Unauthorized') {
                this.tokenService.removeToken();
              }
            } else if (error.status === 0 || error.status === 500) {
              this.alertService.error('Falha ao tentar se comunicar com o servidor, tente novamente mais tarde.');
            } else {
              if (error.error?.length > 0) {
                this.alertService.error(error.error);
              } else {
                this.alertService.error(error.error.message);
              }
            }
          }
          return throwError(error);
        })
      );
  }
}
