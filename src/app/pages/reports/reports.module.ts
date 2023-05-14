import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PrimengModule } from 'src/app/resources/primeng/primeng.module';
import { TableModule } from 'primeng-lts/table';
import { SelectButtonModule } from 'primeng-lts/selectbutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengModule,
    FormsModule,
    SelectButtonModule,
    TableModule
  ]
})
export class ReportsModule { }
