import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BehaviorSubject, of} from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/domain/user.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { combineLatest } from 'rxjs';
import { Course, LanguageEnum, LevelEnum } from 'src/app/domain/course.model';

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

export class CoursesComponent implements OnInit {
  courses?: Course[] | any;
  currentUser$:Observable<User | undefined> ;
  languageOptions: { label: string }[] = [];
  levelOptions: { label: string }[] = [];

  languageFilter$ = new BehaviorSubject<string | null>(null);
  levelFilter$ = new BehaviorSubject<string | null>(null);
  filteredCourses$ : Observable<Course[] | any> = of([])  ;

  cols!: Column[];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private titlecasePipe: TitleCasePipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private afs : AngularFirestore
  ) {

    this.languageOptions = Object.keys(LanguageEnum).map((key) => ({
      label: this.titlecasePipe.transform(key),
    }));

    this.levelOptions = Object.keys(LevelEnum).map((key) => ({ label: key }));

    this.currentUser$ =  this.userService.getCurrentUser()
    
  }

  ngOnInit(): void {
    
    this.getCourses();
    this.initializeFilteredCourses();
    this.filteredCourses$.subscribe(courses => {
        
      this.courses = courses; // courses, filtrelenmiş kursların yeni listesidir
    });
   
  }

  getCourses() {
    this.courseService
      .getCourses()
      .snapshotChanges()
      .pipe(
        tap(changes => console.log(changes)
        ),
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

  initializeFilteredCourses() {
    this.filteredCourses$ = combineLatest([
      this.languageFilter$.pipe(startWith(null)),
      this.levelFilter$.pipe(startWith(null)),      
    ]).pipe(
      switchMap(([language, level]) => 
        this.courseService.filterCourses(language, level)
      ),
      startWith([]) // Başlangıç değeri olarak boş bir dizi atayabilirsiniz.
    );
  }

  filterByLanguage(event:any){     
    this.languageFilter$.next(event.value ? event.value.label : null);
  }

  filterByLevel(event:any){
    this.levelFilter$.next(event.value ? event.value.label : null);
  }


  getSeverity(status: string) {
    switch (status?.toUpperCase()) {
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
