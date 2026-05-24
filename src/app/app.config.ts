import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import LocalePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { MERMAID_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { registerLocaleData, TitleCasePipe } from '@angular/common';

registerLocaleData(LocalePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideMarkdown({
      mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
          theme: 'dark'
        }
      }
    }),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    TitleCasePipe
  ]
};
