import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { ResponseEvent } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
  styleUrls: ['../events.component.scss']
})
export class AvailableEventsComponent implements OnInit {

  public isBlock = false;
  public events: ResponseEvent[] = [];
  public currentFullDate: string;

  constructor(
    private eventService: EventService
  ) {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    this.currentFullDate = date.toISOString();
  }

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
        }
      );
  }

}
