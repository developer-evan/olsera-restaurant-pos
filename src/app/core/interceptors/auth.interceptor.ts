import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

const AUTH_PATHS = ['/auth/login', '/auth/refresh', '/auth/accept-invite'];

function isAuthPath(url: string): boolean {
  return AUTH_PATHS.some((path) => url.includes(path));
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = tokenStorage.getAccessToken();
  let outgoing = req;

  if (token && !isAuthPath(req.url)) {
    outgoing = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(outgoing).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
        return throwError(() => error);
      }

      if (isAuthPath(req.url) || req.headers.has('X-Auth-Retry')) {
        return throwError(() => error);
      }

      return auth.refreshAccessToken().pipe(
        switchMap(() => {
          const refreshedToken = tokenStorage.getAccessToken();
          if (!refreshedToken) {
            return throwError(() => error);
          }

          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${refreshedToken}`,
                'X-Auth-Retry': 'true',
              },
            }),
          );
        }),
        catchError(() => {
          auth.clearSession();
          void router.navigate(['/auth/login']);
          return throwError(() => error);
        }),
      );
    }),
  );
};
