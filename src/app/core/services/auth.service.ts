import { Injectable, signal } from '@angular/core';

const AUTH_STORAGE_KEY = 'olsera_auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authenticated = signal(this.hasStoredSession());

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  login(rememberMe = true): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(AUTH_STORAGE_KEY, '1');
    this.authenticated.set(true);
  }

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    this.authenticated.set(false);
  }

  private hasStoredSession(): boolean {
    return (
      localStorage.getItem(AUTH_STORAGE_KEY) === '1' ||
      sessionStorage.getItem(AUTH_STORAGE_KEY) === '1'
    );
  }
}
