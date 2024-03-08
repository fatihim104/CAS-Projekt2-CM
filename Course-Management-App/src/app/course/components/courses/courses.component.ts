import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest, map, of, startWith, switchMap } from 'rxjs';
import { Course, LanguageEnum, LevelEnum, Status } from 'src/app/course/course.model';
import { User, UserRole } from 'src/app/shared/user/user.model';
import { CourseService } from 'src/app/course/services/course.service';
import { UserService } from 'src/app/shared/user/user.service';
import { TitleCasePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [CourseService, ConfirmationService, MessageService, TitleCasePipe],
})

export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  UserRole = UserRole;
  currentUser$:Observable<User | undefined> ;
  languageOptions: { label: string }[] = [];
  levelOptions: { label: string }[] = [];
  statusOptions: { label: string }[] = [];
  languageFilter$ = new BehaviorSubject<string | null>(null);
  levelFilter$ = new BehaviorSubject<string | null>(null);
  statusFilter$ = new BehaviorSubject<string | null>(null);
  filteredCourses$ : Observable<Course[] | any> = of([]);
  private subscription: Subscription = new Subscription();

  cols!: Column[];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private titlecasePipe: TitleCasePipe,
    private messageService: MessageService,
    private db: AngularFirestore
  ) {
    this.currentUser$ =  this.userService.getCurrentUser()
    this.languageOptions = Object.keys(LanguageEnum).map((key) => ({
      label: this.titlecasePipe.transform(key),
    }));

    this.levelOptions = Object.keys(LevelEnum).map((key) => ({ label: key }));

    this.statusOptions = Object.keys(Status).map((key) => ({
      label: key.toLowerCase(),
    }));
  }

  ngOnInit(): void {
    this.subscription = this.getCourses();
    this.initializeFilteredCourses();
    this.filteredCourses$.subscribe(courses => {  
      this.courses = courses; 
    });
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

  initializeFilteredCourses() {
    this.filteredCourses$ = combineLatest([
      this.languageFilter$.pipe(startWith(null)),
      this.levelFilter$.pipe(startWith(null)),      
      this.statusFilter$.pipe(startWith(null)),      
    ]).pipe(
      switchMap(([language, level, status]) => 
        this.courseService.filterCourses(language, level, status)
      ),
      startWith([])
    );
  }

  filterByLanguage(event:any){     
    this.languageFilter$.next(event.value ? event.value.label : null);
  }

  filterByLevel(event:any){
    this.levelFilter$.next(event.value ? event.value.label : null);
  }

  filterByStatus(event:any){
    this.statusFilter$.next(event.value ? event.value.label :  null);
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

