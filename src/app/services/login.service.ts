import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestLoginStudent, ResponseLogin } from '../models/login';
import { first } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = environment.urlApi;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public loginStudent(requestLoginStudent: RequestLoginStudent): Observable<ResponseLogin> {
    return new Observable<ResponseLogin>(observer => {
      this.httpClient.post<ResponseLogin>(this.urlBase + 'login', requestLoginStudent)
        .pipe(first())
        .subscribe(
          res => {
            this.tokenService.saveToken(res.access_token);
            observer.next(res);
          }, err => {
            observer.next(err);
          }
        );
    });
  }

  public loginVisitor(cpf: string): Observable<ResponseLogin> {
    return new Observable<ResponseLogin>(observer => {
      this.httpClient.post<ResponseLogin>(this.urlBase + 'login/visitor', { cpf })
        .pipe(first())
        .subscribe(
          res => {
            this.tokenService.saveToken(res.access_token);
            observer.next(res);
          }, err => {
            observer.next(err);
          }
        );
    });
  }
}
