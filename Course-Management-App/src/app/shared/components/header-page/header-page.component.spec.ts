
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderPageComponent } from './header-page.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { User } from '../../user/user.model';
import { UserRole } from 'src/app/shared/user/user.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('HeaderPageComponent', () => {
  let component: HeaderPageComponent;
  let fixture: ComponentFixture<HeaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPageComponent ],
      imports: [RouterTestingModule, ButtonModule],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display add button for admin users', () => {
    // Mock the currentUser$ Observable to simulate an admin user
    component.currentUser$ = of({ id: '1', role: UserRole.ADMIN } as User);
    component.addButton = true; // Simulate addButton input set to true
    fixture.detectChanges(); // Trigger a change detection cycle

    const addButton = fixture.debugElement.query(By.css('[data-test-id="add-button"]'));
    expect(addButton).not.toBeNull(); // Check that the add button is present in the DOM
  });

  it('should not display add button for non-admin users', () => {
    // Mock the currentUser$ Observable to simulate a non-admin user
    component.currentUser$ = of({ id: '2', role: UserRole.USER } as User);
    component.addButton = true; // Simulate addButton input set to true
    fixture.detectChanges(); // Trigger a change detection cycle

    const addButton = fixture.debugElement.query(By.css('[data-test-id="add-button"]'));
    expect(addButton).toBeNull(); // Check that the add button is not present in the DOM
  });
});