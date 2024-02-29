import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Course, LevelEnum } from '../domain/course.model';
import { Observable, combineLatest, from, map } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Participant } from '../domain/participant.model';
import { ParticipantService } from './participant.service';
import { CollectionReference } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private dbPath = '/courses';
  selectedStudent:any;

  coursesRef: AngularFirestoreCollection<Course>;

  constructor(private db: AngularFirestore, private participantService: ParticipantService,) {
    this.coursesRef = db.collection(this.dbPath);
  }

  getCourse(id:string){
    return this.coursesRef.doc(id).valueChanges();
  }

  getCourses(): AngularFirestoreCollection<Course> {
    return this.coursesRef;
  }

  getCoursesByTeacher(id: string): Observable<Course[]> {
    return from(
      this.coursesRef.ref.where("teacher.id", "==", id).get()
    ).pipe(
      map(querySnapshot => {
        console.log(querySnapshot);
        return querySnapshot.docs.map(doc => doc.data() as Course);
      })
    );
  }

  getCoursesByStudent(selectedStudentId:any):Observable<Course[]>{
    return this.db.collection<Course>(this.dbPath).valueChanges().pipe(
      map(courses => {
        return courses.filter(course => 
        course.students && course.students.some(student => student.id===selectedStudentId
         )
        );
      })
    );

  }


  // filterCourses(language: string | null, level: string | null): Observable<Course[] | any> {
  //   return combineLatest([
  //     this.db.collection<Course>('courses', ref => {
  //       let query: any = ref;
        
  //       if (language) {
  //         query = query.where('language', '==', language);
  //       }

  //       if (level) {
  //         query = query.where('level', '==', level);
  //       }

  //       return query;
  //     }).valueChanges()
  //   ]);
  // }

  filterCourses(language: string | null, level: string | null): Observable<Course[]> {
    // Firestore'dan kursları filtreleyerek getiren sorgu
    let query = this.db.collection<Course>('courses', ref => {
      let q: firebase.firestore.Query | firebase.firestore.CollectionReference = ref;
      if (language) q = q.where('language.label', '==', language);
      if (level) q = q.where('level.label', '==', level);
      return q;
    });
  
    return query.valueChanges();
  }
  

  filterByLanguage(language:any):Observable<Course[]>{
    return from(
      this.coursesRef.ref.where("language.label", "==", language).get()
    ).pipe(
      map(querySnapshot => {
        console.log("language filtered:",querySnapshot);
        return querySnapshot.docs.map(doc => doc.data() as Course);
      })
    );

  }

  filterByLevel(level:any){
    return from(
      this.coursesRef.ref.where("level.label", "==", level).get()
    ).pipe(
      map(querySnapshot => {
        console.log("level filtered:",querySnapshot);
        return querySnapshot.docs.map(doc => doc.data() as Course);
      })
    );
  } 

  create(course: Course) {
    return this.coursesRef.add({ ...course });
  }

  update(id: string, data: any): any {
    return this.coursesRef.doc('/'+id).update(data);
  }

  delete(id?: string ): Promise<void> {
    return this.coursesRef.doc(id).delete();
  }
}
