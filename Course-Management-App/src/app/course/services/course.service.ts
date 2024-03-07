import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Course } from '../course.model';
import { Observable, combineLatest, from, map, of } from 'rxjs';
import { ParticipantService } from '../../participant/services/participant.service';
import { Participant } from 'src/app/participant/participant.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private dbPath = '/courses';
  selectedStudent:any;

  coursesRef: AngularFirestoreCollection<Course>;

  constructor(private db: AngularFirestore) {
    this.coursesRef = db.collection(this.dbPath);
  }

  getCourse(id:string): Observable<Course | undefined>{
    return this.coursesRef.doc(id).valueChanges() as Observable<Course>;
  }

  getCourses(): Observable<Course[]> {
    return this.coursesRef.snapshotChanges().pipe(
      map(changes => changes.map((c) => ({
        id: c.payload.doc.id,
        ...(c.payload.doc.data() as Course),
      }))
      ),
      
    );
  }

  getCoursesByTeacher(id: string): Observable<Course[]> {
    return from(
      this.coursesRef.ref.where("teacher.id", "==", id).get()
    ).pipe(
      map(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data() as Course);
      })
    );
  }

  getCoursesByStudent(selectedStudentId:string):Observable<Course[]>{
    return this.db.collection<Course>(this.dbPath).valueChanges().pipe(
      map(courses => {
        return courses.filter(course => 
        course.students && course.students.some(student => student.id===selectedStudentId)
        );
      })
    );
  } 

  getCoursesByEmail(userEmail:string | undefined){

    return this.db.collection<Course>(this.dbPath).valueChanges().pipe(
      map(courses => {
        return courses.filter(course => 
        (course.students && course.students.some(student => student.email===userEmail))
        ||
        (course.teacher && course.teacher.email===userEmail)
        );
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

  filterCourses(language: string | null, level: string | null, status:string | null): Observable<Course[]> {
    let query = this.db.collection<Course>('courses', ref => {
      let q : any = ref;
      if (language) q = q.where('language.label', '==', language);
      if (level) q = q.where('level.label', '==', level);
      if (status) q = q.where('status.label', '==', status);
      return q;
    });
  
    return query.snapshotChanges().pipe(
      map(changes => changes.map((c) => ({
        id: c.payload.doc.id,
        ...(c.payload.doc.data() as Course),
      }))
      ),
      
    );
  }

  searchCourses(term: string): Observable<Course[]> {
    if (!term.trim()) {
      return of([]);
    }
    const fields = ["language.label", "level.label", "status.label", "price"];
    const queries = fields.map(field =>
      this.db.collection<Course>('/courses', ref => ref.where(field, '==', term)).valueChanges()
    );
  
    return combineLatest(queries).pipe(
      map(arrays => arrays.flat()),
      map((courses: Course[]) => courses.reduce((acc: Course[], current: Course) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, [] as Course[]))
    );
  }
}
