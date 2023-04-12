import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginStudentComponent } from './login-student/login-student.component';
import { LoginPrivateComponent } from './login-private/login-private.component';
import { LoginVisitorComponent } from './login-visitor/login-visitor.component';


@NgModule({
  declarations: [
    LoginStudentComponent,
    LoginPrivateComponent,
    LoginVisitorComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
