import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestLoginStudent, ResponseLogin } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = environment.urlApi;

  constructor(
    private httpClient: HttpClient
  ) { }

  public loginStudent(requestLoginStudent: RequestLoginStudent): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.urlBase + 'login', requestLoginStudent);
  }

  public loginVisitor(cpf: string): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.urlBase + 'login/visitor', { cpf });
  }
}
