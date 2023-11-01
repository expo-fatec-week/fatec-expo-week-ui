import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { RequestLectureCode, ResponseEventLecture } from 'src/app/models/event';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-lecture-students',
  templateUrl: './lecture-students.component.html',
  styleUrls: ['../students.component.scss']
})
export class LectureStudentsComponent implements OnInit {

  public isBlock = false;
  public events: ResponseEventLecture[] = [];
  public requestLectureCode: RequestLectureCode;

  constructor(
    private eventService: EventService,
    private tokenService: TokenService,
    private alertService: AlertService,
    private geolocationService: GeolocationService
  ) {
    this.requestLectureCode = {} as RequestLectureCode;
  }

  ngOnInit(): void {
    this.listByResponsability();
  }

  public generateCode(): void {
    if (this.geolocationService.allowedLocation()) {
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
    } else {
      if (this.geolocationService.currentLatitude === 0 || this.geolocationService.currentLongitude === 0) {
        this.alertService.info('Você precisa permitir o uso da localização para acionar esse recurso. Saia do sistema, permita a localização no seu navegador e acesse novamente.');
      } else {
        this.alertService.info('Você precisa estar na instituição para realizar esta requisição.');
      }
    }
  }

  public listByResponsability(): void {
    if (this.geolocationService.allowedLocation()) {
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
    } else {
      if (this.geolocationService.currentLatitude === 0 || this.geolocationService.currentLongitude === 0) {
        this.alertService.info('Você precisa permitir o uso da localização para acionar esse recurso. Saia do sistema, permita a localização no seu navegador e acesse novamente.');
      } else {
        this.alertService.info('Você precisa estar na instituição para realizar esta requisição.');
      }
    }
  }

}
