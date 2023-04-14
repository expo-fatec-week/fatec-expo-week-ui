import { Component } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { RequestLoginVisitor as RequestLoginVisitor } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-visitor',
  templateUrl: './login-visitor.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginVisitorComponent {

  public isBlock = false;
  public requestLoginVisitant = {} as RequestLoginVisitor;

  constructor(
    private loginService: LoginService
  ) { }

  public tryLogin(): void {
    console.log('Tentou');
  }

  public doLogin(): void {
    this.isBlock = true;
    this.loginService.loginVisitant(this.requestLoginVisitant.cpf)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        success => {
          console.log(success);
        },
        error => {
          alert(error);
        }
      );
  }

}
