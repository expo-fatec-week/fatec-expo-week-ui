import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { RequestConfirmLecture, ResponseEvent } from 'src/app/models/event';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { StudentsService } from 'src/app/services/students.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-participated-events',
  templateUrl: './participated-events.component.html',
  styleUrls: ['../events.component.scss']
})
export class ParticipatedEventsComponent implements OnInit {

  public isBlock = false;
  public lectureDay = false;
  public events: ResponseEvent[] = [];
  private requestConfirmLecture: RequestConfirmLecture;
  public displayModal = false;

  constructor(
    private studentService: StudentsService,
    private eventService: EventService,
    private alertService: AlertService,
    private tokenService: TokenService,
    private geolocationService: GeolocationService
  ) {
    this.requestConfirmLecture = {} as RequestConfirmLecture;
  }

  ngOnInit(): void {
    const date = new Date();
    if (date.getDay() === 4 || date.getDay() === 5) {
      this.lectureDay = true;
    }

    this.listEvents();
  }

  public listEvents(): void {
    this.isBlock = true;
    this.studentService.listParticipatedEvents(this.tokenService.getUserLogged().personId)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.events = success;
        }, error => {
          this.alertService.error(error.message);
        }
      );
  }

  public confirmPresenceLecture(code: string): void {
    if (this.geolocationService.allowedLocation()) {
      this.requestConfirmLecture.id_pessoa = this.tokenService.getUserLogged().personId;
      this.requestConfirmLecture.cod_validacao = code;
      this.isBlock = true;
      this.eventService.confirmPresenceLecture(this.requestConfirmLecture)
        .pipe(first(),
          finalize(() => {
            this.isBlock = false;
          }))
        .subscribe(
          success => {
            this.alertService.info(success);
            this.listEvents();
            this.displayModal = false;
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

  showDialog() {
    this.displayModal = true;
  }

}
