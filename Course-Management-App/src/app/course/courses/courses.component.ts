import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { Course, Language, Status } from 'src/app/domain/course.model';
import { CourseService } from 'src/app/services/course.service';

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

  cols!: Column[];

  constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCourses();

    this.cols = [
      { field: 'language', header: 'Language' },
      { field: 'level', header: 'Level' },
      { field: 'place', header: 'Place' },
      { field: 'status', header: 'Status' },
      { field: 'price', header: 'Price' },
    ];
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

  planNewCourse() {
    const course = {
      language: Language.SPANISH,
      level: 'A2',
      place: 'Luzern',
      status: Status.PLANNING,
      price: 700,
    };
    this.courseService.create(course).then(() => {
      console.log('created successfully!');
    });
  }

  editCourse(course: Course) {
    return console.log(course);
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
