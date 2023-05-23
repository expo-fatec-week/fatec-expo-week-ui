import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestConfirmExhibit, RequestConfirmLecture, RequestLectureCode, ResponseEvent, ResponseEventLecture } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private urlApi = environment.urlApi + 'event';

  constructor(
    private httpClient: HttpClient
  ) { }

  public listEvents(): Observable<Array<ResponseEvent>> {
    return this.httpClient.get<Array<ResponseEvent>>(this.urlApi);
  }

  public listByResponsability(personId: number): Observable<ResponseEventLecture[]> {
    return this.httpClient.get<Array<ResponseEventLecture>>(this.urlApi + `/responsability/${personId}`);
  }

  public validadePresenceStand(requestConfirmExhibit: RequestConfirmExhibit): Observable<string> {
    return this.httpClient.post<string>(this.urlApi + '/exhibit', requestConfirmExhibit);
  }

  public generateCode(requestLectureCode: RequestLectureCode): Observable<string> {
    return this.httpClient.post<string>(this.urlApi + '/lecture/generate-code', requestLectureCode);
  }

  public confirmPresenceLecture(requestConfirmLecture: RequestConfirmLecture): Observable<string> {
    return this.httpClient.post<string>(this.urlApi + '/lecture/confirm-presence', requestConfirmLecture);
  }
}
