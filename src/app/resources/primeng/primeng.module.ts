import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng-lts/inputtext';
import { ButtonModule } from 'primeng-lts/button';
import { BlockUIModule } from 'primeng-lts/blockui';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    BlockUIModule
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    BlockUIModule
  ]
})
export class PrimengModule { }
