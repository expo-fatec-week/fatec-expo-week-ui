import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private urlBase = environment.urlApi + 'event';

  constructor(
    private httpClient: HttpClient
  ) { }

  public listEvents(): Observable<Array<ResponseEvent>> {
    return this.httpClient.get<Array<ResponseEvent>>(this.urlBase);
  }

}
