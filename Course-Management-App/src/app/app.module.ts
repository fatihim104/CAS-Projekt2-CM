import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';

import { environment } from 'src/environments/environment.development';
import { MessageService } from 'primeng/api';

import { CourseModule } from './course/course.module';
import { ParticipantModule } from './participant/participant.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuComponent } from './tab-menu/tab-menu';



@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,   
    TabMenuModule,  
    CourseModule,
    AuthModule,
    ParticipantModule,
    TeamModule,
    AppRoutingModule,
    ToastModule,
    ButtonModule
  ],
  exports:[
   
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
