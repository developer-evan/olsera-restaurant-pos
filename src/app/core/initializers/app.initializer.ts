import { inject, provideAppInitializer } from '@angular/core';
import { catchError, firstValueFrom, of, switchMap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { StoreContextService } from '../services/store-context.service';
import { TokenStorageService } from '../services/token-storage.service';

function initializeAppSession(): Promise<void> {
  const auth = inject(AuthService);
  const storeContext = inject(StoreContextService);
  const tokenStorage = inject(TokenStorageService);

  if (!auth.isAuthenticated()) {
    return Promise.resolve();
  }

  if (auth.isSuperAdmin()) {
    return firstValueFrom(
      auth.restoreSession().pipe(
        catchError(() => {
          auth.clearSession();
          return of(null);
        }),
      ),
    ).then(() => undefined);
  }

  return firstValueFrom(
    auth.restoreSession().pipe(
      catchError(() => {
        auth.clearSession();
        storeContext.reset();
        return of(null);
      }),
      switchMap((user) => {
        if (!user) {
          return of(null);
        }

        return storeContext.loadStores().pipe(
          switchMap((stores) => {
            if (stores.length === 0) {
              return of(null);
            }

            const savedStoreId = tokenStorage.getActiveStoreId();
            const hasValidSelection =
              !!savedStoreId && stores.some((store) => store.id === savedStoreId);
            const activeId = hasValidSelection
              ? savedStoreId!
              : stores.length === 1
                ? stores[0].id
                : null;

            if (!activeId) {
              return of(null);
            }

            return storeContext.loadAccessContext(activeId);
          }),
          catchError(() => of(null)),
        );
      }),
    ),
  ).then(() => undefined);
}

export const appInitializerProvider = provideAppInitializer(initializeAppSession);
