import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { RequestConfirmLecture, ResponseEvent } from 'src/app/models/event';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';
import { StudentsService } from 'src/app/services/students.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-participated-events',
  templateUrl: './participated-events.component.html',
  styleUrls: ['./participated-events.component.scss']
})
export class ParticipatedEventsComponent implements OnInit {

  public isBlock = false;
  public events: ResponseEvent[] = [];
  private requestConfirmLecture: RequestConfirmLecture;

  constructor(
    private studentService: StudentsService,
    private eventService: EventService,
    private alertService: AlertService,
    private tokenService: TokenService
  ) {
    this.requestConfirmLecture = {} as RequestConfirmLecture;
  }

  ngOnInit(): void {
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

  public confirmPresenceLecture(): void {
    this.isBlock = true;
    this.eventService.confirmPresenceLecture(this.requestConfirmLecture)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          this.alertService.info(success);
        }
      );
  }

}
