import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { RequestConfirmExhibit } from 'src/app/models/event';
import { Student } from 'src/app/models/student';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';
import { StudentsService } from 'src/app/services/students.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-stand-students',
  templateUrl: './stand-students.component.html',
  styleUrls: ['./stand-students.component.scss']
})
export class StandStudentsComponent implements OnInit {

  public isBlock = false;
  public students: Student[] = [];
  public requestConfirmExhibit: RequestConfirmExhibit
  constructor(
    private studentService: StudentsService,
    private eventService: EventService,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {
    this.requestConfirmExhibit = {} as RequestConfirmExhibit;
  }

  ngOnInit(): void {
    this.isBlock = true;
    this.studentService.listStudents()
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.students = success;
        }
      );
  }

  public validatePresence(student: Student): void {
    this.alertService.confirm(`Confirmar presença para:<br>${student.nome} ?`, undefined, () => {
      this.sendPresence(student.id_pessoa);
    });
  }

  private sendPresence(personIdParticiped: number): void {
    this.isBlock = true;
    const { personId, respEventId } = this.tokenService.getUserLogged();
    this.requestConfirmExhibit = {
      id_evento: respEventId,
      id_pessoa_validacao: personId,
      id_pessoa_participante: personIdParticiped
    };
    this.eventService.validadePresenceStand(this.requestConfirmExhibit)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.alertService.success(success);
        }
      );
  }

}
