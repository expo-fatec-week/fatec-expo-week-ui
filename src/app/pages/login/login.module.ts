import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginStudentComponent } from './login-student/login-student.component';
import { LoginVisitorComponent } from './login-visitor/login-visitor.component';

import { PrimengModule } from 'src/app/resources/primeng/primeng.module';
import { CardModule } from 'primeng-lts/card';
import { CheckboxModule } from 'primeng-lts/checkbox';

@NgModule({
  declarations: [
    LoginStudentComponent,
    LoginVisitorComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    PrimengModule,
    CardModule,
    CheckboxModule
  ]
})
export class LoginModule { }
