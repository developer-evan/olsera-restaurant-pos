import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { StoreContextService } from '../services/store-context.service';

/** Ensures stores are loaded and an active store + access context exist. */
export const storeReadyGuard: CanActivateFn = () => {
  const storeContext = inject(StoreContextService);
  const router = inject(Router);

  return storeContext.ensureStoreReady().pipe(
    map((redirect) => (redirect ? router.createUrlTree([redirect]) : true)),
  );
};

/** Owner / manager dashboard — redirect cashier & kitchen to their apps. */
export const dashboardRoleGuard: CanActivateFn = () => {
  const storeContext = inject(StoreContextService);
  const router = inject(Router);
  const role = storeContext.accessContext()?.role;

  if (role === 'cashier') {
    return router.createUrlTree(['/pos/orders']);
  }

  if (role === 'kitchen') {
    return router.createUrlTree(['/kitchen/orders']);
  }

  return true;
};

/** POS app — requires order creation permission. */
export const posGuard: CanActivateFn = () => {
  const storeContext = inject(StoreContextService);
  const router = inject(Router);

  if (storeContext.can('orders:create')) {
    return true;
  }

  return router.createUrlTree([storeContext.resolveHomeRoute()]);
};

/** Kitchen display — kitchen staff plus managers/owners who can update orders. */
export const kitchenGuard: CanActivateFn = () => {
  const storeContext = inject(StoreContextService);
  const router = inject(Router);
  const role = storeContext.accessContext()?.role;

  if (role === 'kitchen' || storeContext.can('orders:update')) {
    return true;
  }

  return router.createUrlTree([storeContext.resolveHomeRoute()]);
};

export const permissionGuard =
  (permission: string): CanActivateFn =>
  () => {
    const storeContext = inject(StoreContextService);
    const router = inject(Router);

    if (storeContext.can(permission)) {
      return true;
    }

    return router.createUrlTree([storeContext.resolveHomeRoute()]);
  };
