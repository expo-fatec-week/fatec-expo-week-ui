import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialComponent } from './pages/initial/initial.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { ButtonModule } from 'primeng-lts/button';


@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
