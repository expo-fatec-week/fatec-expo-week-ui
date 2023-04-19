import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly token = 'token';
  private readonly personId = 'personId';
  private readonly name = 'name';

  public saveToken(token: string): void {
    localStorage.setItem(this.token, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  public removeToken(): void {
    localStorage.removeItem(this.token);
  }

}
