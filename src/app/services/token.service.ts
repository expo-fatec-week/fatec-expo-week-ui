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

  public savePerson(personId: number, name: string): void {
    localStorage.setItem(this.personId, String(personId));
    localStorage.setItem(this.name, name);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  public getPerson(): { personId: number | null, name: string | null } | null {
    const personId = Number(localStorage.getItem(this.personId));
    const name = localStorage.getItem(this.name);
    if (personId != 0 && name) return { personId, name };
    return null;
  }

  public removeToken(): void {
    localStorage.removeItem(this.token);
  }

  public removePerson(): void {
    localStorage.removeItem(this.personId);
    localStorage.removeItem(this.name);
  }

  public isAuthenticated(): boolean {
    if (this.getPerson() || this.getToken()) return true;
    return false;
  }

}
