import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Course } from '../domain/course.model';
import { Observable, from, map } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Participant } from '../domain/participant.model';
import { ParticipantService } from './participant.service';

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

  // getCoursesByStudent(selectedStudentId:any): Observable<Course[]> {
        
  //   this.participantService.getParticipant(selectedStudentId)
  //   .subscribe((student) => {
  //     this.selectedStudent = student;
      
  //     console.log(this.selectedStudent);
  // })
  // console.log(this.selectedStudent);
  
  
    
  //   return from(
  //     this.coursesRef.ref.where("students", "array-contains", this.selectedStudent).get()).pipe(
  //     map(querySnapshot => {
  //       console.log(querySnapshot);
  //       return querySnapshot.docs.map(doc => doc.data() as Course);
  //     })
  //   );
  // }

  


  // getCoursesByStudent(selectedStudentId: any): Observable<Course[]> {
  //   return this.participantService.getParticipant(selectedStudentId).pipe(
  //     tap((student) => {
  //       this.selectedStudent = student;
  //       console.log('Selected Student:', this.selectedStudent);
  //     }),
  //     switchMap(() => {
       
  //       return from(
  //         this.coursesRef.ref.where("course.students", "array-contains", this.selectedStudent).get()
  //       ).pipe(
  //         tap((querySnapshot) => {
  //           console.log('Firebase Query Result:', querySnapshot);
  //         }),
  //         map(querySnapshot => {
  //           return querySnapshot.docs.map(doc => doc.data() as Course);
  //         })
  //       );
  //     })
  //   );
  // }

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
