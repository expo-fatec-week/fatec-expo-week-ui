import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';
import { UserLoggedIn } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly token = 'token';
  constructor(private router: Router) { }

  public saveToken(token: string): void {
    sessionStorage.setItem(this.token, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.token);
  }

  public removeToken(): void {
    sessionStorage.removeItem(this.token);
    this.router.navigateByUrl('');
  }

  public getUserLogged(): UserLoggedIn {
    if (this.getToken()) {
      const { name, email, userType, personId, respEventId }: UserLoggedIn = jwt.default(this.getToken() ?? '');
      return {
        name,
        email,
        userType,
        personId,
        respEventId
      };
    }
    return {} as UserLoggedIn;
  }

}
