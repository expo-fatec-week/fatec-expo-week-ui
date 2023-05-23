import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { RequestLoginAdministrator, RequestNewPasswordAdministrator } from 'src/app/models/login';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login-admin.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginAdminComponent {

  public isBlock = false;
  public definePassword = false;
  public requestLogin: RequestLoginAdministrator;
  public requestNewPassword: RequestNewPasswordAdministrator;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenService: TokenService,
    private adminService: AdminService,
    private alertService: AlertService
  ) {
    this.requestLogin = {} as RequestLoginAdministrator;
    this.requestNewPassword = {} as RequestNewPasswordAdministrator;
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
          this.router.navigateByUrl('backoffice/relatorios');
        }
      );
  }

  public newPassword(): void {
    this.isBlock = true;
    this.requestNewPassword.email = this.requestLogin.email;
    this.requestNewPassword.password = this.requestLogin.password;
    this.adminService.updatePassword(this.requestNewPassword)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        res => {
          this.alertService.success(res);
        }
      );
  }

}
