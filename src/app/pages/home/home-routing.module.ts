import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () => import('../events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'alunos',
        canLoad: [AuthGuard],
        loadChildren: () => import('../students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'relatorios',
        canLoad: [AuthGuard],
        loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
