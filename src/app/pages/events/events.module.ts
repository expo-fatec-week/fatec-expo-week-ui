import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { ParticipatedEventsComponent } from './participated-events/participated-events.component';
import { AvailableEventsComponent } from './available-events/available-events.component';

import { TableModule } from 'primeng/table';
import { PrimengModule } from 'src/app/resources/primeng/primeng.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    ParticipatedEventsComponent,
    AvailableEventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    TableModule,
    PrimengModule,
    DialogModule
  ]
})
export class EventsModule { }
