import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private greaterLatitude = -23.51700;
  private greaterLongitude = -46.74300;
  private lowerLatitude = -23.52800;
  private lowerLongitude = -46.76400;

  public currentLatitude: number;
  public currentLongitude: number;

  constructor() {
    this.currentLatitude = 0;
    this.currentLongitude = 0;
    this.getCurrentLocation();
  }

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;
      });
    }
    else {
      alert('Geolocalização não é suportada por este navegador.');
    }
  }

  public allowedLocation(): boolean {
    if ((this.currentLatitude <= this.greaterLatitude && this.currentLatitude >= this.lowerLatitude)
      && (this.currentLongitude <= this.greaterLongitude && this.currentLongitude >= this.lowerLongitude)) {
      return true;
    }
    return true;
  }

}
