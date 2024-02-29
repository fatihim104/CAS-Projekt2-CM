import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/course/course.model';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { CourseService } from 'src/app/course/services/course.service';
import { UserService } from 'src/app/shared/user/user.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CourseService, ConfirmationService, MessageService],
})

export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  UserRole = UserRole;
  currentUser$:Observable<User | undefined> ;
  private subscription: Subscription = new Subscription();

  cols!: Column[];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.currentUser$ =  this.userService.getCurrentUser()
  }

  ngOnInit(): void {
    this.subscription = this.getCourses();
  }

  getCourses() {
   return this.courseService
      .getCourses()
      .subscribe( {
        next: data => this.courses = data, 
        error: (error) => {
          console.error('Error fetching courses', error);
          this.courses = [];
        }
      }
      );
  }

  deleteCourse(course: Course) {    
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + course.language + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.delete(course.id)
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Course Deleted',
          life: 2000,
        });
      },
    });
  }

  getSeverity(status: string) {
    switch (status.toUpperCase()) {
      case 'ONGOING':
        return 'success';
      case 'PLANNING':
        return 'warning';
      case 'READY':
        return 'info';
      case 'CANCELLED':
        return 'danger';
      case 'FINISHED':
        return 'primary';
      default:
        return 'info';
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

