import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestLoginVisitor } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUsersService {

  private urlBase = environment.urlApi;

  constructor(
    private httpClient: HttpClient
  ) { }

  public registerVisitor(requestVisitor: RequestLoginVisitor): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(this.urlBase + 'visitor', requestVisitor);
  }

}
