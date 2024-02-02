import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Participant } from 'src/app/participant/participant.model';
import { User } from 'src/app/shared/user/user.model';
import { CourseRegistrationService } from 'src/app/course/services/services/course-registration.service';
import { CourseService } from 'src/app/course/services/services/course.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss'],
})
export class DetailCourseComponent implements OnInit {
  selectedCourse: any;
  selectedCourseId: string = '';
  participants: any[] = [];
  currentUser$: Observable<User | undefined>;
  candidates: Participant[] = [];

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private courseService: CourseService,
    private registrationService: CourseRegistrationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.selectedCourseId =
      this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.courseService.getCourse(this.selectedCourseId).subscribe((course) => {
      this.selectedCourse = course;
      this.participants = this.selectedCourse.students;
    });

    this.getCandidates(this.selectedCourseId);

    this.getForm();
  }

  getCandidates(courseId: string) {
    return this.registrationService
      .getCandidatesByCourseId(this.selectedCourseId)
      .subscribe((data) => {
        this.candidates = data;
      });
  }

  getForm() {
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      lastName: ['', Validators.required],
      phone: [''],
      email: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const newRegistration = {
      ...this.form.value,
      courseId: this.selectedCourseId,
    };

    this.registrationService
      .create(newRegistration)
      .then((data) => {
        if (data) {
          this.messageService.add({
            key: 'tl',
            severity: 'success',
            summary: 'Thank you for your apply. We will contact with you!',
          });
        }
        this.form.reset();
      })
      .catch((error) => {
        this.messageService.add({
          key: 'tl',
          severity: 'error',
          summary: 'There is an error',
          detail: error,
        });
      });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
