import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MessageService } from 'primeng/api';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { TabMenuModule } from 'primeng/tabmenu';
import { CourseModule } from './app/course/course.module';
import { AuthModule } from './app/auth/auth.module';
import { ParticipantModule } from './app/participant/participant.module';
import { TeamModule } from './app/team/team.module';
import { AppRoutingModule } from './app/app-routing.module';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DividerModule } from 'primeng/divider';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      AngularFireAuthModule,
      TabMenuModule,
      CourseModule,
      AuthModule,
      ParticipantModule,
      TeamModule,
      AppRoutingModule,
      ToastModule,
      ButtonModule,
      MenubarModule,
      TableModule,
      DialogModule,
      DropdownModule,
      AvatarModule,
      TieredMenuModule,
      DividerModule
    ),
    MessageService,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
