import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { EnumStudentType } from '../models/EnumStudentType';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tokenService.getToken()) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }

  canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (route.path === 'alunos') {
      if (this.tokenService.getUserLogged().userType !== EnumStudentType.ORGANIZADOR
        && this.tokenService.getUserLogged().userType !== EnumStudentType.EXPOSITOR) {
        this.router.navigateByUrl('eventos');
        return false;
      }
    }

    if (route.path === 'relatorios') {
      if (this.tokenService.getUserLogged().userType !== 'ADMINISTRADOR') {
        this.router.navigateByUrl('backoffice');
        return false;
      }
    }

    return true;
  }

}
