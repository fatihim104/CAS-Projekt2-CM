import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from 'src/app/domain/course.model';
import { User } from 'src/app/domain/user.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

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

export class CoursesComponent implements OnInit {
  courses?: Course[] | any;
  currentUser$:Observable<User | undefined> ;

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
    this.getCourses();
  }

  getCourses() {
    this.courseService
      .getCourses()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          })) 
        )
      )
      .subscribe(
        (data) => {
          this.courses = data;
        }, 
        (error) => {
          console.error('Error fetching courses', error);
          this.courses = [];
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
          detail: 'Product Deleted',
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
}
