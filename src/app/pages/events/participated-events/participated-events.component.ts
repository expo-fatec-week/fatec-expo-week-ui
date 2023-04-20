import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { ResponseEvent } from 'src/app/models/event';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-participated-events',
  templateUrl: './participated-events.component.html',
  styleUrls: ['./participated-events.component.scss']
})
export class ParticipatedEventsComponent implements OnInit {

  public isBlock = false;
  public events: ResponseEvent[] = [];

  constructor(
    private eventService: EventService,
    private alertService: AlertService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.listEvents();
  }

  public listEvents(): void {
    this.isBlock = true;
    this.eventService.listParticipatedEvents(this.tokenService.getUserLogged().personId)
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

}
