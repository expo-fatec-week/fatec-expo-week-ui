import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MenubarModule } from 'primeng-lts/menubar';
import { ButtonModule } from 'primeng-lts/button';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenubarModule,
    ButtonModule
  ]
})
export class HomeModule { }
