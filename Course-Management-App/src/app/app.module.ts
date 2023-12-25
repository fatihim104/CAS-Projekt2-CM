import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { TabMenuComponent } from './tab-menu/tab-menu';
import { ToastModule } from 'primeng/toast';


import { TeamComponent } from './components/team/team.component';

import { HomeComponent } from './components/home/home.component';

import { ParticipantsComponent } from './components/participants/participants.component';
import { ContactComponent } from './components/contact/contact.component';
import { environment } from 'src/environments/environment.development';
import { CourseModule } from './course/course.module';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    TabMenuComponent,
    HomeComponent,
    TeamComponent,
    ParticipantsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,   
    TabMenuModule,  
    CourseModule,
    AppRoutingModule,
    ToastModule
   
    // FormsModule
  ],
  exports:[
   
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
