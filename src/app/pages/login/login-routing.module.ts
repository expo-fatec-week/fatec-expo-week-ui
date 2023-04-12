import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStudentComponent } from './login-student/login-student.component';
import { LoginPrivateComponent } from './login-private/login-private.component';
import { LoginVisitorComponent } from './login-visitor/login-visitor.component';

const routes: Routes = [
  { path: '', component: LoginStudentComponent },
  { path: 'visitante', component: LoginVisitorComponent },
  { path: 'restrito', component: LoginPrivateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
