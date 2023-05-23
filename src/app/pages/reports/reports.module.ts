import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PrimengModule } from 'src/app/resources/primeng/primeng.module';
import { TableModule } from 'primeng-lts/table';
import { SelectButtonModule } from 'primeng-lts/selectbutton';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng-lts/dropdown';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    PrimengModule,
    FormsModule,
    SelectButtonModule,
    TableModule,
    DropdownModule
  ]
})
export class ReportsModule { }
