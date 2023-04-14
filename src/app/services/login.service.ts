import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestLoginPrivate, ResponseLoginPrivate, ResponseLoginStudent, ResponseLoginVisitor } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = environment.urlApi;

  constructor(
    private httpClient: HttpClient
  ) { }

  public loginStudent(ra: string, email: string): Observable<Array<ResponseLoginStudent>> {
    return this.httpClient.get<Array<ResponseLoginStudent>>(this.urlBase + `student/${ra}/${email}`);
  }

  public loginPrivate(requestLoginPrivate: RequestLoginPrivate): Observable<ResponseLoginPrivate> {
    return this.httpClient.post<ResponseLoginPrivate>(this.urlBase + 'login', requestLoginPrivate);
  }

  public loginVisitant(cpf: string): Observable<Array<ResponseLoginVisitor>> {
    return this.httpClient.get<Array<ResponseLoginVisitor>>(this.urlBase + `user/${cpf}`);
  }
}
