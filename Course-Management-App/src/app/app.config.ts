import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app-routing.module';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment.development';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService,
    importProvidersFrom( AngularFireModule.initializeApp(environment.firebaseConfig)),
    AngularFirestoreModule,
    AngularFireAuthModule
  ]
};
