import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BehaviorSubject} from 'rxjs';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Course, LanguageEnum, LevelEnum } from 'src/app/domain/course.model';
import { User } from 'src/app/domain/user.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { combineLatest } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

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

  languageFilter$ = new BehaviorSubject<string|null>(null);
  levelFilter$ = new BehaviorSubject<string|null>(null);
  filteredCourses$ : Observable<Course[] | any> ;

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

    this.filteredCourses$ = combineLatest(
     [ this.languageFilter$,
      this.levelFilter$]
    ).pipe(
      switchMap(([language, level]:[string | null, string | null] ) => 

      this.courseService.filterCourses(language,level) as Observable<Course[]>
     
    )

    );
    
   
  }

  ngOnInit(): void {
    this.getCourses();
   
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

  // filterByLanguage(event:any){
  //   if(event.value){
  //     this.languageFilter$.next(event.value?.label)
  //     console.log("event",event);
      
  //     // this.courseService.filterByLanguage(this.languageFilter$).subscribe((data: Course[])  => {
  //     //   this.courses =  data;
  //     // })
  //   }
  //   this.getCourses()
  // }

  // filterByLevel(event:any){

  //   if(event.value){
  //     this.levelFilter$.next(event.value?.label)
  //     console.log("event",event);
      
  //     // this.courseService.filterByLevel(this.selectedLevel).subscribe((data: Course[])  => {
  //     //   this.courses =  data;
  //     })
  //   }
  //   this.getCourses()

  // }

  
  


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
