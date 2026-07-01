import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { StoreContextService } from '../services/store-context.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};

export const platformGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/auth/login']);
  }

  if (auth.isSuperAdmin()) {
    return true;
  }

  return router.createUrlTree(['/overview']);
};

export const tenantGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/auth/login']);
  }

  if (auth.isSuperAdmin()) {
    return router.createUrlTree(['/platform/organizations']);
  }

  return true;
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const storeContext = inject(StoreContextService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return true;
  }

  if (auth.isSuperAdmin()) {
    return router.createUrlTree(['/platform/organizations']);
  }

  return storeContext.ensureStoreReady().pipe(
    map((redirect) =>
      redirect ? router.createUrlTree([redirect]) : router.createUrlTree([storeContext.resolveHomeRoute()]),
    ),
  );
};
