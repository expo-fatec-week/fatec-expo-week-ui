import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';
import { RequestConfirmExhibit } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private urlApi = environment.urlApi;

  constructor(
    private httpClient: HttpClient
  ) { }

  public listStudents(): Observable<Array<Student>> {
    return this.httpClient.get<Array<Student>>(this.urlApi + 'student');
  }

  public validadePresenceStand(requestConfirmExhibit: RequestConfirmExhibit): Observable<string> {
    return this.httpClient.post<string>(this.urlApi + 'event/exhibit', requestConfirmExhibit);
  }
}
