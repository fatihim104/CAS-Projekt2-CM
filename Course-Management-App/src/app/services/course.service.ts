import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';
import { Course } from '../domain/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private dbPath = '/courses';

  coursesRef: AngularFirestoreCollection<Course>;

  constructor(private db: AngularFirestore) {
    this.coursesRef = db.collection(this.dbPath);
  }

  getCourse(id:string){
    return this.coursesRef.doc(id).valueChanges();
  }

  getCourses(): AngularFirestoreCollection<Course> {
    return this.coursesRef;
  }

  getCoursesByTeacher(id:string){
    return this.coursesRef.ref.where("teacher.id","==", id)

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
