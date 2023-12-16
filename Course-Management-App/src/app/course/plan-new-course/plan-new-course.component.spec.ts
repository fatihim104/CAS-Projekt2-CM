import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNewCourseComponent } from './plan-new-course.component';

describe('PlanNewCourseComponent', () => {
  let component: PlanNewCourseComponent;
  let fixture: ComponentFixture<PlanNewCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanNewCourseComponent]
    });
    fixture = TestBed.createComponent(PlanNewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
