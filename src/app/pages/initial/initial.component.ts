import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent {

  constructor(
    private router: Router
  ) { }

  public navigate(uri: string) {
    console.log(uri);
    this.router.navigateByUrl(uri);
  }

}
