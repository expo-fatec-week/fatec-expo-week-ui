import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';
import { RequestLoginVisitor as RequestLoginVisitor } from 'src/app/models/login';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { RegisterUsersService } from 'src/app/services/register-users.service';

@Component({
  selector: 'app-login-visitor',
  templateUrl: './login-visitor.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginVisitorComponent {

  public isBlock = false;
  public requestLoginVisitor = {} as RequestLoginVisitor;
  public enableRegister = false;

  constructor(
    private loginService: LoginService,
    private resgiterUser: RegisterUsersService,
    private alertService: AlertService,
    private router: Router
  ) { }

  public tryLogin(): void {
    if (!this.requestLoginVisitor.email && !this.requestLoginVisitor.name) {
      this.doLogin();
    } else {
      this.registerVisitor();
    }
  }

  public doLogin(): void {
    this.isBlock = true;
    this.loginService.loginVisitor(this.requestLoginVisitor.cpf)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        res => {
          if (res) {
            this.router.navigateByUrl('home');
          } else {
            this.enableRegister = true;
          }
        }
      );
  }

  public registerVisitor(): void {
    this.isBlock = true;
    this.resgiterUser.registerVisitor(this.requestLoginVisitor)
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

  public showTermsAndPolicies(): void {
    const message = `<div class="text-left p-4"><p><strong>Termo de uso</strong></p>
    <p>Este é um termo de uso estabelecido a você, designado como usuário. O presente termo trata-se da utilidade do sistema
        web disponibilizado gratuitamente, seja para dispositivos móveis ou computadores pessoais. Leia cuidadosamente em
        razão de que o uso deste site significa que foi analisado e aceitado todos os termos.</p>
    
    <p class="pt-4"><strong>Coleta e uso de dados</strong></p>
    <p>O usuário se compromete em informar com veracidade os dados fornecidos. Ao aceitar os termos, o usuário assente a
        plataforma a coletar, armazenar e/ou utilizar informações, incluindo todos os dados já fornecidos pelo mesmo ao
        realizar
        o cadastro.</p>
    
    <p class="pt-4"><strong>Licença</strong></p>
    <p>Este temo de uso não cede ao usuário qualquer direito de propriedade, apenas para acesso e uso dos serviços
        disponibilizados.</p>
    
    <p class="pt-4"><strong>Responsabilidade</strong></p>
    <p>É responsabilidade do usuário:</p>
    <ol type="I" class="pl-4">
        <li>Fornecer dados atualizados, tais como cpf e e-mail;</li>
        <li>Autenticidade nos dados fornecidos ao realizar cadastro;</li>
    </ol></div>`;
    this.alertService.notification(message, 'Termos de uso e privacidade');
  }

}
