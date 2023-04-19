import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { TableModule } from 'primeng-lts/table';
import { TabViewModule } from 'primeng-lts/tabview';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TableModule,
    TabViewModule
  ]
})
export class HomeModule { }
