import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng-lts/api';
import { EnumStudentType } from 'src/app/models/EnumStudentType';
import { AlertService } from 'src/app/services/alert.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isBlock = false;
  public menuItems: MenuItem[] = [];
  public userName: string;

  constructor(
    private alertService: AlertService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.userName = this.tokenService.getUserLogged().name;
  }

  ngOnInit(): void {
    window.onscroll = () => this.observerScroll();
    switch (this.tokenService.getUserLogged().userType) {
      case EnumStudentType.ORGANIZADOR:
        this.menuItems = [
          {
            label: 'Disponíveis',
            icon: 'pi pi-lock-open',
            routerLink: 'disponiveis'
          },
          {
            label: 'Participados',
            icon: 'pi pi-check',
            routerLink: 'participados'
          },
          {
            label: 'Validar Palestra',
            icon: 'pi pi-users',
            routerLink: 'alunos/validar-palestra'
          }
        ];
        break;
      case EnumStudentType.EXPOSITOR:
        this.menuItems = [
          {
            label: 'Disponíveis',
            icon: 'pi pi-lock-open',
            routerLink: 'disponiveis'
          },
          {
            label: 'Participados',
            icon: 'pi pi-check',
            routerLink: 'participados'
          },
          {
            label: 'Confirmar presenças',
            icon: 'pi pi-users',
            routerLink: 'alunos/confirmar-presenca'
          }
        ];
        break;

      default:
        this.menuItems = [
          {
            label: 'Disponíveis',
            icon: 'pi pi-lock-open',
            routerLink: 'disponiveis'
          },
          {
            label: 'Participados',
            icon: 'pi pi-check',
            routerLink: 'participados'
          }
        ];
        break;
    }
  }

  public scrollToTop() {
    window.scrollTo(0, 0);
  }

  private observerScroll() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      document.getElementById('button-scroll')?.classList.add('flex');
    } else {
      document.getElementById('button-scroll')?.classList.remove('flex');
    }
  }

  public exit(): void {
    this.alertService.confirm('Deseja encerrar a sessão?', 'Sair', () => {
      sessionStorage.removeItem('token');
      this.router.navigateByUrl('');
    });
  }

}
