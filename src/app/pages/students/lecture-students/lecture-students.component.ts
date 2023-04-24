import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { RequestLectureCode, ResponseEventLecture } from 'src/app/models/event';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-lecture-students',
  templateUrl: './lecture-students.component.html',
  styleUrls: ['./lecture-students.component.scss']
})
export class LectureStudentsComponent implements OnInit {

  public isBlock = false;
  public events: ResponseEventLecture[] = [];
  public requestLectureCode: RequestLectureCode;

  constructor(
    private eventService: EventService,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {
    this.requestLectureCode = {} as RequestLectureCode;
  }

  ngOnInit(): void {
    this.listByResponsability();
  }

  public generateCode(): void {
    this.requestLectureCode.id_evento = this.tokenService.getUserLogged().respEventId;
    this.requestLectureCode.id_pessoa = this.tokenService.getUserLogged().personId;
    this.alertService.confirm('Essa ação não pode ser desfeita, deseja gerar o código de validação para o evento?', 'Gerar código', () => {
      this.isBlock = true;
      this.eventService.generateCode(this.requestLectureCode)
        .pipe(first(),
          finalize(() => {
            this.isBlock = false;
          }))
        .subscribe(
          success => {
            this.alertService.info(success);
          }
        );
    });
  }

  public listByResponsability(): void {
    this.isBlock = true;
    this.eventService.listByResponsability(this.tokenService.getUserLogged().personId)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.events = success;
        }
      );
  }

}
