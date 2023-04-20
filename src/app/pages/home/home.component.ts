import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng-lts/api';
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
    this.menuItems = [
      // {
      // label: 'Eventos',
      // items: [
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
      // ]
      // }
    ];
  }

  public scrollToTop() {
    window.scrollTo(0, 0);
  }

  private observerScroll() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
      document.getElementById('button-scroll')?.classList.add('flex');
    } else {
      document.getElementById('button-scroll')?.classList.remove('flex');
    }
  }

  public exit(): void {
    sessionStorage.removeItem('access_token');
    this.router.navigateByUrl('');
  }

}
