import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TeachersComponent } from './teachers.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Team } from '../../team.model';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TeamService } from '../../services/team.service';
import { UserService } from 'src/app/shared/user/user.service';

describe('TeachersComponent', () => {
  let compnent: TeachersComponent;
  let fixture: ComponentFixture<TeachersComponent>;
  let router: Router;

  const MockAngularFirestore = {
    collection: () => ({
      valueChanges: () => of([]),
      snapshotChanges: () => of([]),
    }),
  };

  const MockAngularFireAuth = {
    authState: of(null),
  };

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ButtonModule],
      declarations: [TeachersComponent],
      providers: [
        { provide: TeamService, useValue: jasmine.createSpyObj('TeamService', ['getTeachers'])},
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', { getCurrentUser: of({}) }) },
        { provide: AngularFireAuth, useValue: MockAngularFireAuth },
        { provide: AngularFirestore, useValue: MockAngularFirestore },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersComponent);
    compnent = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

  })

  it('should navigate to the teacher details button is clickted', fakeAsync(() => {
    const mockTeachers: Team[] = [{ id: '123', firstName: 'Jan', lastName: 'Nuri'},
                                  { id: '456', firstName: 'Jane', lastName: 'Doe' }
                                ];
    compnent.teachers = mockTeachers;

    fixture.detectChanges();
    tick()
    fixture.detectChanges();
    const detailButtonId = 'detail-button-123';
    const detailButton = fixture.debugElement.query(By.css(`[data-test-id="${detailButtonId}"]`));
    console.log('detaile', detailButton);
    expect(detailButton).toBeTruthy()

//     detailButton.nativeElement.click();
//     fixture.detectChanges();
  
//     expect(router.navigate).toHaveBeenCalledWith(['/team/detail/123']);
  }));
});
