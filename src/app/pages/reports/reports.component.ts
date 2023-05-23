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
  public responseStudents!: ResponseStudentByCourse[];
  public responseVisitors!: ResponseVisitor[];
  public courses!: ResponseCourse[];
  public selectedCourse!: ResponseCourse;
  public columnsOfTable!: Array<{ field: string, header: string }>
  public readonly students = 'students';
  public readonly visitors = 'visitors';

  constructor(
    private adminService: AdminService,
    private alertService: AlertService
  ) {
    this.filterTypes = [
      { label: 'Alunos', value: this.students },
      { label: 'Visitantes', value: this.visitors }
    ];
    this.selectedFilterType = this.filterTypes[0];
    this.initSelections();
  }

  ngOnInit(): void {
    if (this.selectedFilterType.value === this.students) {
      this.listCourses();
    }
  }

  public list(): void {
    if (this.selectedFilterType.value === this.students) {
      if (this.selectedCourse?.id_curso) {
        return this.listStudentsByCourse(this.selectedCourse.id_curso);
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
          if (success?.length > 0) {
            this.courses = success;
          } else {
            this.alertService.info('Não existem cursos cadastrados.');
          }
        }
      );
  }

  private listStudentsByCourse(courseId: number): void {
    this.responseStudents = [];
    this.isBlock = true;
    this.adminService.listStudentsByCourse(courseId)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          if (success?.length > 0) {
            this.responseStudents = success;
          } else {
            this.alertService.info('Nenhum aluno deste curso participou do evento.');
          }
        }
      );
  }

  private listVisitors(): void {
    this.responseVisitors = [];
    this.isBlock = true;
    this.adminService.listVisitors()
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          if (success?.length > 0) {
            this.responseVisitors = success;
          } else {
            this.alertService.info('Não existem visitantes cadastrados.');
          }
        }
      );
  }

  public onChangeFilterType(): void {
    this.initSelections();
    if (this.selectedFilterType.value === this.students) {
      this.listCourses();
    } else {
      this.listVisitors();
    }
  }

  private initSelections(): void {
    if (this.selectedFilterType.value === this.students) {
      this.columnsOfTable = [
        { field: 'ra', header: 'RA' },
        { field: 'nome', header: 'Nome' },
        { field: 'qtd_eventos_participados', header: 'Qtd. Participações' }
      ];
    } else {
      this.columnsOfTable = [
        { field: 'cpf', header: 'CPF' },
        { field: 'nome', header: 'Nome' },
        { field: 'email', header: 'E-mail' },
        { field: 'telefone', header: 'Telefone' }
      ];
    }
    this.responseStudents = [];
    this.responseVisitors = [];
    this.courses = [];
    this.selectedCourse = {} as ResponseCourse;
  }

}
