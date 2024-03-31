import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TabMenuComponent } from './tab-menu';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { UserRole } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/auth/services/auth.service';

describe('TabMenuComponent', () => {
    let component : TabMenuComponent;
    let fixture : ComponentFixture<TabMenuComponent>;
    let userServiceSpy: jasmine.SpyObj<UserService>;
  
    class MockAuthService {
        hasToken = of(true);
    }
    
    class MockUserService {
        // Simulate an admin user
        getCurrentUser() {
          return of({ role: UserRole.ADMIN, email: 'admin@example.com' });
        }
    }
      
    class MockAngularFireAuth {
    }

    beforeEach(waitForAsync( () => {

        TestBed.configureTestingModule({
            declarations: [TabMenuComponent],
            providers: [
                { provide: UserService, useValue: jasmine.createSpyObj('UserService', { getCurrentUser: of({}) }) },
                { provide: AuthService, useClass: MockAuthService },
                { provide: UserService, useClass: MockUserService },
                { provide: AngularFireAuth, useClass: MockAngularFireAuth },
            ],
            imports: [RouterTestingModule,],
            schemas: [NO_ERRORS_SCHEMA] 
        }).compileComponents();


    }));

    beforeEach(() => {

        userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
        fixture = TestBed.createComponent(TabMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

    it('should display users tab menu for an admin user', (done) => {
        // component.currentUser$ = of({ id: '2', role: UserRole.ADMIN } as User);
        // userServiceSpy.getCurrentUser.and.returnValue(of({ role: UserRole.ADMIN }));
                
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();

       
        
            // Try finding the Users item now that the component should be fully initialized
            const usersItem = component.items?.find(item => item.label === 'Users');
            console.log("useritem", usersItem);
        
            // Perform your assertions
            expect(usersItem).toBeDefined(); // Check that the Users item is defined
            // expect(usersItem?.visible).toBeTruthy(); // Check that it's visible
        
            done(); // Indicate that the test is complete
    
    })

})