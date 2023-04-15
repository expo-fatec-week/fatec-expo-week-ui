import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestLoginPrivate, ResponseLoginPrivate, ResponseLoginStudent, ResponseLoginVisitor } from '../models/login';
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

  public loginStudent(ra: string, email: string): Observable<Array<ResponseLoginStudent>> {
    return new Observable<Array<ResponseLoginStudent>>(observer => {
      this.httpClient.get<Array<ResponseLoginStudent>>(this.urlBase + `student/${ra}/${email}`)
        .pipe(first())
        .subscribe(
          res => {
            this.tokenService.savePerson(res[0].id_pessoa, res[0].nome);
            observer.next(res);
          }, err => {
            observer.next(err);
          }
        );
    });
  }

  public loginPrivate(requestLoginPrivate: RequestLoginPrivate): Observable<ResponseLoginPrivate> {
    return new Observable<ResponseLoginPrivate>(observer => {
      this.httpClient.post<ResponseLoginPrivate>(this.urlBase + 'login', requestLoginPrivate)
        .pipe(first())
        .subscribe(
          res => {
            this.tokenService.saveToken(res.token);
            observer.next(res);
          }, err => {
            observer.next(err);
          }
        );
    });
  }

  public loginVisitant(cpf: string): Observable<Array<ResponseLoginVisitor>> {
    return new Observable<Array<ResponseLoginVisitor>>(observer => {
      this.httpClient.get<Array<ResponseLoginVisitor>>(this.urlBase + `user/${cpf}`)
        .pipe(first())
        .subscribe(
          res => {
            this.tokenService.savePerson(res[0].id_pessoa, res[0].nome);
            observer.next(res);
          }, err => {
            observer.next(err);
          }
        );
    });
  }
}
