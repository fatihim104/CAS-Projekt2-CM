import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course/course.model';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { CourseService } from 'src/app/course/services/course.service';
import { TeamService } from 'src/app/team/services/team.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.component.html',
  styleUrls: ['./detail-teacher.component.scss'],
})
export class DetailTeacherComponent {
  selectedTeacher: any;
  selectedTeacherId: string = '';
  courses: Course[] = [];
  UserRole = UserRole;
  currentUser$: Observable<User | undefined>;

  constructor(
    private teamService: TeamService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe,
    private userService: UserService
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.selectedTeacherId =
      this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.teamService.getTeacher(this.selectedTeacherId).subscribe((teacher) => {
      this.selectedTeacher = teacher;
    });
    this.courseService
      .getCoursesByTeacher(this.selectedTeacherId)
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
}
