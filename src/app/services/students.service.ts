import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';
import { ResponseEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private urlApi = environment.urlApi + 'student';

  constructor(
    private httpClient: HttpClient
  ) { }

  public listStudents(): Observable<Array<Student>> {
    return this.httpClient.get<Array<Student>>(this.urlApi);
  }

  public listParticipatedEvents(personId: number): Observable<Array<ResponseEvent>> {
    return this.httpClient.get<Array<ResponseEvent>>(this.urlApi + '/confirmed-events/' + personId);
  }
}
