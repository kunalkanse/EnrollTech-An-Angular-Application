import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly TOKEN_KEY = 'SESSION_TOKEN';

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
