import { Component } from '@angular/core';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private geolocation: GeolocationService) { }

  public showCredits(): void {
    console.log('créditos');
  }

}
