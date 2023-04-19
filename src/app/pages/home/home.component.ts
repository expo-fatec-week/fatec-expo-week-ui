import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { ResponseEvent } from 'src/app/models/event';
import { AlertService } from 'src/app/services/alert.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public events: ResponseEvent[] = [];
  public isBlock = false;

  constructor(
    private eventService: EventService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.listEvents();
  }

  public listEvents(): void {
    this.isBlock = true;
    this.eventService.listEvents()
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
