import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { appInitializerProvider } from './core/initializers/app.initializer';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ngrokInterceptor } from './core/interceptors/ngrok.interceptor';
import { storeInterceptor } from './core/interceptors/store.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([ngrokInterceptor, authInterceptor, storeInterceptor])),
    provideRouter(routes),
    appInitializerProvider,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
  ],
};
