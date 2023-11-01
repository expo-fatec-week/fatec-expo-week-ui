import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialComponent } from './pages/initial/initial.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AlertComponent } from './resources/components/alert/alert.component';
import { HttpComunicationInterceptor } from './services/http-comunication.interceptor';

import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

registerLocaleData(localeBr);

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    NotFoundComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpComunicationInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DialogService,
    DynamicDialogRef
  ]
})
export class AppModule { }
