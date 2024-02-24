import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Course } from '../course.model';
import { Observable, from, map } from 'rxjs';
import { ParticipantService } from '../../participant/services/participant.service';
import { Participant } from 'src/app/participant/participant.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private dbPath = '/courses';
  selectedStudent:any;

  coursesRef: AngularFirestoreCollection<Course>;

  constructor(private db: AngularFirestore, private participantService: ParticipantService,) {
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
      )
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
}
