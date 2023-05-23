import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { LectureStudentsComponent } from './lecture-students/lecture-students.component';
import { StandStudentsComponent } from './stand-students/stand-students.component';
import { PrimengModule } from 'src/app/resources/primeng/primeng.module';
import { TableModule } from 'primeng-lts/table';


@NgModule({
  declarations: [
    LectureStudentsComponent,
    StandStudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    PrimengModule,
    TableModule,
    PrimengModule
  ]
})
export class StudentsModule { }
