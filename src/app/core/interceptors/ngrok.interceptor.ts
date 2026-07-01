import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../../environments/environment';

/** Bypass ngrok free-tier browser warning (returns HTML without CORS headers). */
export const ngrokInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.ngrok) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { 'ngrok-skip-browser-warning': 'true' },
    }),
  );
};
