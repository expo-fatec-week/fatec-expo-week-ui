import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestLoginVisitor, ResponseLoginVisitor } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUsersService {

  private urlBase = environment.urlApi;

  constructor(
    private httpClient: HttpClient
  ) { }

  public registerVisitor(requestVisitor: RequestLoginVisitor): Observable<ResponseLoginVisitor> {
    return this.httpClient.post<ResponseLoginVisitor>(this.urlBase + 'user', requestVisitor);
  }

}
