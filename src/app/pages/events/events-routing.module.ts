import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableEventsComponent } from './available-events/available-events.component';
import { ParticipatedEventsComponent } from './participated-events/participated-events.component';

const routes: Routes = [
  { path: '', redirectTo: 'disponiveis' },
  { path: 'disponiveis', component: AvailableEventsComponent },
  { path: 'participados', component: ParticipatedEventsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
