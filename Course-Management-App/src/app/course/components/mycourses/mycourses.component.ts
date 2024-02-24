import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { UserService } from 'src/app/shared/user/user.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../course.model';
import { DatePipe } from '@angular/common';
import { error } from 'cypress/types/jquery';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css'],
})
export class MycoursesComponent implements OnInit {
  currentUser$: Observable<User | undefined>;
  // todo user role enum
  role: UserRole | undefined ;
  user: User | undefined;
  courses: Course[] = [];

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private datepipe: DatePipe
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
        this.role = user?.role;
        this.getCourseOfUsers(user?.email);
      },
      error: (error) =>
        console.error('error by fetcing courses by email', error),
    });
  }

  getCourseOfUsers(email: string | undefined) {

    return this.courseService
      .getCoursesByEmail(email)
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
}
