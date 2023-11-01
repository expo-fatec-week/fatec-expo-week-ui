import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandStudentsComponent } from './stand-students/stand-students.component';
import { LectureStudentsComponent } from './lecture-students/lecture-students.component';

const routes: Routes = [
  { path: '', redirectTo: 'confirmar-presenca', pathMatch: 'prefix' },
  { path: 'confirmar-presenca', component: StandStudentsComponent },
  { path: 'validar-palestra', component: LectureStudentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
