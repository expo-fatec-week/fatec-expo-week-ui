import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialComponent } from './pages/initial/initial.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: InitialComponent },
  { path: 'backoffice', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'eventos', canActivate: [AuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
