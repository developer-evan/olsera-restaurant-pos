import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, map, shareReplay, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  AcceptInvitePayload,
  AuthSession,
  AuthTokens,
  AuthUser,
  LoginCredentials,
} from '../models/auth.model';
import { ApiResponse } from '../models/api-response.model';
import { TokenStorageService } from './token-storage.service';
import { StoreContextService } from './store-context.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorage = inject(TokenStorageService);
  private readonly storeContext = inject(StoreContextService);

  private readonly userSignal = signal<AuthUser | null>(this.tokenStorage.getUser());
  private refreshInFlight: Observable<AuthTokens> | null = null;

  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal() && this.tokenStorage.hasSession());
  readonly isSuperAdmin = computed(() => this.userSignal()?.platformRole === 'super_admin');

  login(credentials: LoginCredentials, rememberMe: boolean): Observable<AuthSession> {
    return this.http
      .post<ApiResponse<AuthSession>>(`${environment.apiBaseUrl}/auth/login`, credentials)
      .pipe(map((response) => this.persistSession(response.data, rememberMe)));
  }

  acceptInvite(payload: AcceptInvitePayload, rememberMe: boolean): Observable<AuthSession> {
    return this.http
      .post<ApiResponse<AuthSession>>(`${environment.apiBaseUrl}/auth/accept-invite`, payload)
      .pipe(map((response) => this.persistSession(response.data, rememberMe)));
  }

  restoreSession(): Observable<AuthUser> {
    return this.http.get<ApiResponse<AuthUser>>(`${environment.apiBaseUrl}/auth/me`).pipe(
      map((response) => {
        this.userSignal.set(response.data);
        return response.data;
      }),
    );
  }

  refreshAccessToken(): Observable<AuthTokens> {
    if (this.refreshInFlight) {
      return this.refreshInFlight;
    }

    const refreshToken = this.tokenStorage.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    this.refreshInFlight = this.http
      .post<ApiResponse<AuthTokens>>(`${environment.apiBaseUrl}/auth/refresh`, { refreshToken })
      .pipe(
        map((response) => {
          this.tokenStorage.updateTokens(response.data);
          return response.data;
        }),
        catchError((error) => {
          this.clearSession();
          return throwError(() => error);
        }),
        finalize(() => {
          this.refreshInFlight = null;
        }),
        shareReplay(1),
      );

    return this.refreshInFlight;
  }

  logout(): Observable<void> {
    const refreshToken = this.tokenStorage.getRefreshToken();

    const request$ = refreshToken
      ? this.http.post<void>(`${environment.apiBaseUrl}/auth/logout`, { refreshToken })
      : new Observable<void>((subscriber) => {
          subscriber.next();
          subscriber.complete();
        });

    return request$.pipe(
      finalize(() => this.clearSession()),
      map(() => undefined),
    );
  }

  clearSession(): void {
    this.tokenStorage.clear();
    this.userSignal.set(null);
    this.storeContext.reset();
  }

  private persistSession(session: AuthSession, rememberMe: boolean): AuthSession {
    this.tokenStorage.saveSession(session, rememberMe);
    this.userSignal.set(session.user);
    return session;
  }
}
