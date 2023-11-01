import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BlockUIModule } from 'primeng/blockui';


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
