import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ParticipantModule } from './participant/participant.module';
import { TeamModule } from './team/team.module';
import { TabMenuComponent } from './shared/components/tab-menu/tab-menu';
import { HomeComponent } from './shared/components/home/home.component';
import { MenubarModule } from 'primeng/menubar';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      TabMenuComponent,
      HomeComponent,
    ],
    imports: [
      RouterTestingModule,
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
      ButtonModule,
      TabMenuModule,
      MenubarModule
    ],
    providers: [MessageService],
  }).compileComponents()
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Course-Management-App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Course-Management-App');
  });
});
