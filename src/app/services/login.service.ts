import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestLoginAdministrator, RequestLoginStudent, ResponseLogin } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = environment.urlApi + 'login/';

  constructor(
    private httpClient: HttpClient
  ) { }

  public loginAdministrator(requestLoginAdministrator: RequestLoginAdministrator): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.urlBase, requestLoginAdministrator);
  }

  public loginStudent(requestLoginStudent: RequestLoginStudent): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.urlBase + 'student', requestLoginStudent);
  }

  public loginVisitor(cpf: string): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.urlBase + 'visitor', { cpf });
  }
}
