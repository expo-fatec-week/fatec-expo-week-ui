import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng-lts/api';
import { finalize, first } from 'rxjs/operators';
import { ResponseCourse } from 'src/app/models/course';
import { ResponseVisitor } from 'src/app/models/login';
import { ResponseStudentByCourse } from 'src/app/models/student';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public isBlock = false;
  public filterTypes: SelectItem[];
  public selectedFilterType: SelectItem;
  public responseStudents: ResponseStudentByCourse[];
  public responseVisitors: ResponseVisitor[];
  public courses: ResponseCourse[];
  public selectedCourse!: ResponseCourse;
  private readonly students = 'students';
  private readonly visitors = 'visitors';

  constructor(
    private adminService: AdminService,
    private alertService: AlertService
  ) {
    this.filterTypes = [
      { label: 'Alunos', value: this.students },
      { label: 'Visitantes', value: this.visitors }
    ];
    this.selectedFilterType = this.filterTypes[0];
    this.responseStudents = [];
    this.responseVisitors = [];
    this.courses = [];
  }

  ngOnInit(): void {
    console.log('Oi');
  }

  public list(): void {
    if (this.selectedFilterType.value === this.students) {
      if (this.selectedCourse.id_curso) {
        return this.listStudentsByCourse(this.selectedCourse.id_curso);
      } else {
        this.alertService.warning('Selecione o curso desejado');
      }
    } else {
      return this.listVisitors();
    }
  }

  private listCourses(): void {
    this.isBlock = true;
    this.adminService.listCourses()
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.courses = success;
        }
      );
  }

  private listStudentsByCourse(courseId: number): void {
    this.isBlock = true;
    this.adminService.listStudentsByCourse(courseId)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.responseStudents = success;
        }
      );
  }

  private listVisitors(): void {
    this.isBlock = true;
    this.adminService.listVisitors()
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.responseVisitors = success;
        }
      );
  }



}
