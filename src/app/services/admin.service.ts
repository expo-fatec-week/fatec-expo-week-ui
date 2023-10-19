/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseStudentByCourse } from '../models/student';
import { ResponseCourse } from '../models/course';
import { RequestNewPasswordAdministrator, ResponseVisitor } from '../models/login';
import { ResponseEvent } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private urlApi = environment.urlApi + 'administration/';

  constructor(private httpClient: HttpClient) { }

  public listCourses(): Observable<ResponseCourse[]> {
    return this.httpClient.get<ResponseCourse[]>(this.urlApi + 'courses');
  }

  public listStudentsByCourse(courseId: number): Observable<Array<ResponseStudentByCourse>> {
    return this.httpClient.get<Array<ResponseStudentByCourse>>(this.urlApi + `courses/${courseId}/students-with-events`);
  }

  public listVisitors(): Observable<ResponseVisitor[]> {
    return this.httpClient.get<ResponseVisitor[]>(this.urlApi + 'visitors');
  }

  public updatePassword(requestNewPassword: RequestNewPasswordAdministrator): Observable<string> {
    return this.httpClient.put<string>(this.urlApi + 'update', requestNewPassword);
  }

  public listDetailsParticipatedByPerson(personId: number): Observable<ResponseEvent[]> {
    return this.httpClient.get<ResponseEvent[]>(this.urlApi + `person/${personId}/events-participated`);
  }

  public downloadListDetailsParticipatedByCourse(courseId: number): Observable<any> {
    return this.httpClient.get<any>(this.urlApi + `courses/${courseId}/events-participated`, { headers: { 'Content-Type': 'text/csv' } });
  }

}
