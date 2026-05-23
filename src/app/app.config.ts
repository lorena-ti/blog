import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import LocalePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { provideMarkdown } from 'ngx-markdown';
import { registerLocaleData } from '@angular/common';

registerLocaleData(LocalePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideMarkdown(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
};
