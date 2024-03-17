import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/course/course.model';
import { CourseService } from 'src/app/course/services/course.service';
import { ParticipantService } from 'src/app/participant/services/participant.service';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-detail-participant',
  templateUrl: './detail-participant.component.html',
  styleUrls: ['./detail-participant.component.scss'],
})
export class DetailParticipantComponent implements OnInit, OnDestroy {
  selectedStudent: any;
  selectedStudentId: string = '';
  courses: Course[] = [];
  currentUser$: Observable<User | undefined>;
  UserRole = UserRole;
  private subscriptions: Subscription[] = [];

  constructor(
    private participantService: ParticipantService,
    private courseService: CourseService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.selectedStudentId =
      this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.subscriptions.push(this.getParticipant());
    this.subscriptions.push(this.getCoursesOfStudent());
  }

  getParticipant() {
    return this.participantService
      .getParticipant(this.selectedStudentId)
      .subscribe((student) => {
        this.selectedStudent = student;
      });
  }

  getCoursesOfStudent() {
    return this.courseService
      .getCoursesByStudent(this.selectedStudentId)
      .subscribe((data: Course[]) => {
        this.courses = data;
      });
  }

  getDate(course: Course) {
    const timestamp = course?.date;
    if (typeof timestamp === 'object' && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return this.datepipe.transform(date, 'dd/MM/yyyy');
    } else {
      return '';
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
