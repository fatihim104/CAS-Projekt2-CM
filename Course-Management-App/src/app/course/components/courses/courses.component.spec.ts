import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CourseService } from 'src/app/course/services/course.service';
import {  DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {  of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/shared/user/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserRole } from 'src/app/shared/user/user.model';
import { By } from '@angular/platform-browser';
import { HeaderPageComponent } from 'src/app/shared/components/header-page/header-page.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Course, LanguageEnum, LevelEnum, Status } from '../../course.model';
import { ButtonModule } from 'primeng/button';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
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
      imports: [RouterTestingModule, ButtonModule,],
      declarations: [ CoursesComponent, HeaderPageComponent ],
      providers: [
        { provide: CourseService, useValue: jasmine.createSpyObj('CourseService', ['getCourses', 'filterCourses']) },
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', { getCurrentUser: of({}) }) },
        { provide: AngularFireAuth, useValue: MockAngularFireAuth },
        { provide: AngularFirestore, useValue: MockAngularFirestore },
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should update languageFilter$ when filterByLanguage is called', () => {
    const mockLanguage = { label: 'ENGLISH' };
    component.filterByLanguage({ value: mockLanguage });
    component.languageFilter$.subscribe(value => {
      expect(value).toEqual(mockLanguage.label);
    });
  });
 
  it('should add button for admin users', fakeAsync(() => {
    userServiceSpy.getCurrentUser.and.returnValue(of({ role: UserRole.ADMIN }));

    fixture.detectChanges();
          
    const headerComponentInstance  = fixture.debugElement.query(By.directive(HeaderPageComponent)).componentInstance;
    
    expect(headerComponentInstance).toBeTruthy();
    expect(headerComponentInstance.addButton).toBeTrue();
    expect(headerComponentInstance.header).toEqual("Active Courses");
 
  }));

   
  it('should header display for all users', fakeAsync(() => {
    fixture.detectChanges();
     
    const headerComponentInstance  = fixture.debugElement.query(By.directive(HeaderPageComponent)).componentInstance;
   
    expect(headerComponentInstance.header).toEqual("Active Courses");
 
  }));

  it('should navigate to the course detail page when detail button is clicked', fakeAsync(() => {
    // Assume we have a course with id '123' in the component's course list
    const courseId = '123'
    const mockCourses : Course[] = [{ id: '123', language: { label: LanguageEnum.ENGLISH }, level: { label: LevelEnum.A1 }, place: 'Online', status:Status.PLANNING , price: 100 }];
    component.courses = mockCourses;
    
    fixture.detectChanges(); // Trigger initial data binding
    tick(); // Simulate passage of time if necessary

    const detailButtonId = `#detail-button-${courseId}`;
    const detailButton = fixture.debugElement.query(By.css(''));
    // const detailButton = fixture.debugElement.query('[data-test-id="add-button"]').nativeElement;
    
    console.log("detail",fixture.debugElement);
  
    
    // detailButton.nativeElement.click();

//     let buttonDe: DebugElement = fixture.debugElement.query(By.directive(PButtonDirective));
// if (buttonDe) {
//     buttonDe.nativeElement.click();
// } else {
//     fail('Could not find button with pi pi-eye icon');
// }
    
    fixture.detectChanges(); // Update the view
    tick();

    // Check if the router's navigate method was called with the correct parameters
    expect(router.navigate).toHaveBeenCalledWith(['/courses/detail', mockCourses[0].id]);
  }));
});

