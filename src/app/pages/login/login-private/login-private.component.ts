import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { RequestLoginPrivate } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-private',
  templateUrl: './login-private.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginPrivateComponent {

  public isBlock = false;
  public requestLoginPrivate = {} as RequestLoginPrivate;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  public doLogin(): void {
    this.isBlock = true;
    this.loginService.loginPrivate(this.requestLoginPrivate)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        () => {
          this.router.navigateByUrl('home');
        }
      );
  }
}
