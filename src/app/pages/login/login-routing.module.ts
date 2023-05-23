import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStudentComponent } from './login-student/login-student.component';
import { LoginVisitorComponent } from './login-visitor/login-visitor.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';

const routes: Routes = [
  { path: '', component: LoginStudentComponent },
  { path: 'visitante', component: LoginVisitorComponent },
  { path: 'admin', component: LoginAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
