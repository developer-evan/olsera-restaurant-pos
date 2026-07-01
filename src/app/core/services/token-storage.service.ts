import { Injectable } from '@angular/core';

import { AuthSession, AuthTokens, AuthUser } from '../models/auth.model';

const ACCESS_TOKEN_KEY = 'olsera_access_token';
const REFRESH_TOKEN_KEY = 'olsera_refresh_token';
const USER_KEY = 'olsera_user';
const ACTIVE_STORE_KEY = 'olsera_active_store_id';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  saveSession(session: AuthSession, rememberMe: boolean): void {
    const storage = this.resolveStorage(rememberMe);
    storage.setItem(ACCESS_TOKEN_KEY, session.tokens.accessToken);
    storage.setItem(REFRESH_TOKEN_KEY, session.tokens.refreshToken);
    storage.setItem(USER_KEY, JSON.stringify(session.user));

    const other = rememberMe ? sessionStorage : localStorage;
    other.removeItem(ACCESS_TOKEN_KEY);
    other.removeItem(REFRESH_TOKEN_KEY);
    other.removeItem(USER_KEY);
  }

  updateTokens(tokens: AuthTokens): void {
    const storage = this.getActiveStorage();
    storage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    storage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }

  getAccessToken(): string | null {
    return this.getActiveStorage().getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.getActiveStorage().getItem(REFRESH_TOKEN_KEY);
  }

  getUser(): AuthUser | null {
    const raw = this.getActiveStorage().getItem(USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  getActiveStoreId(): string | null {
    return localStorage.getItem(ACTIVE_STORE_KEY);
  }

  setActiveStoreId(storeId: string): void {
    localStorage.setItem(ACTIVE_STORE_KEY, storeId);
  }

  clearActiveStoreId(): void {
    localStorage.removeItem(ACTIVE_STORE_KEY);
  }

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.clearActiveStoreId();
  }

  hasSession(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken() && !!this.getUser();
  }

  private resolveStorage(rememberMe: boolean): Storage {
    return rememberMe ? localStorage : sessionStorage;
  }

  private getActiveStorage(): Storage {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      return localStorage;
    }

    return sessionStorage;
  }
}
