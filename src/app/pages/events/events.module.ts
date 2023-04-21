import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { ParticipatedEventsComponent } from './participated-events/participated-events.component';
import { AvailableEventsComponent } from './available-events/available-events.component';

import { TableModule } from 'primeng-lts/table';
import { PrimengModule } from 'src/app/resources/primeng/primeng.module';

@NgModule({
  declarations: [
    ParticipatedEventsComponent,
    AvailableEventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    TableModule,
    PrimengModule
  ]
})
export class EventsModule { }
