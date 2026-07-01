import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenStorageService } from '../services/token-storage.service';

export const storeInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);
  const storeId = tokenStorage.getActiveStoreId();

  if (!storeId) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { 'X-Store-Id': storeId },
    }),
  );
};
