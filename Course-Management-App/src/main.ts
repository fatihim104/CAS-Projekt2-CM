import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { DividerModule } from 'primeng/divider';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app/app-routing.module';
import { TeamModule } from './app/team/team.module';
import { ParticipantModule } from './app/participant/participant.module';
import { AuthModule } from './app/auth/auth.module';
import { CourseModule } from './app/course/course.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, AngularFireAuthModule, TabMenuModule, CourseModule, AuthModule, ParticipantModule, TeamModule, AppRoutingModule, ToastModule, ButtonModule, MenubarModule, TableModule, DialogModule, DropdownModule, AvatarModule, TieredMenuModule, DividerModule),
        MessageService,
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
