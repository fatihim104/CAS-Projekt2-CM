import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Course } from '../../course.model';
import { Observable, from, map } from 'rxjs';
import { ParticipantService } from '../../../participant/services/participant.service';

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
