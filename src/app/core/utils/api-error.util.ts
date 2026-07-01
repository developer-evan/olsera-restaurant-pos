import { HttpErrorResponse } from '@angular/common/http';

import { ApiErrorResponse } from '../models/api-response.model';

export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (!(error instanceof HttpErrorResponse)) {
    return fallback;
  }

  const body = error.error as ApiErrorResponse | undefined;
  if (!body?.message) {
    return fallback;
  }

  return Array.isArray(body.message) ? body.message.join(', ') : body.message;
}
