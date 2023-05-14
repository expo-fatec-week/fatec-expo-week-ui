import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { RequestLoginAdministrator } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login-admin.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginAdminComponent {

  public isBlock = false;
  public requestLogin: RequestLoginAdministrator;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.requestLogin = {} as RequestLoginAdministrator;
  }

  public doLogin(): void {
    this.isBlock = true;
    this.loginService.loginAdministrator(this.requestLogin)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        res => {
          this.tokenService.saveToken(res.access_token);
          this.router.navigateByUrl('relatorios');
        }
      );
  }

}
