import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch
} from '@angular/common/http';
import { getMonacoConfig } from './components/editor/monaco-editor.service';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { provideClientHydration } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    HttpClientModule,
    MonacoEditorModule,
    provideHttpClient(withFetch()),
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useValue: getMonacoConfig(),
    },

  ]
};

// we exclude this cus monaco does not provide server side rendering and causes console issues, which is annoying

export const excludedProviders = [
  MonacoEditorModule,
  {
    provide: NGX_MONACO_EDITOR_CONFIG,
    useValue: getMonacoConfig(),
  },
];

