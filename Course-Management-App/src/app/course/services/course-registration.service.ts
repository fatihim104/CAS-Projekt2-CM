import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Participant } from '../../participant/participant.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { arrayRemove, arrayUnion } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CourseRegistrationService {
  private dbPath = '/registrations';

  registrationsRef: AngularFirestoreCollection<Participant>;

  constructor(private db: AngularFirestore) {
    this.registrationsRef = db.collection(this.dbPath);
  }

  removeParticipantFromCourse( participant: Participant, selectedCourseId: string ) {
    const courseRef = this.db.collection('courses').doc(selectedCourseId);
    return from(courseRef.update({
      students: arrayRemove(participant)
    }));
  }

  create(participant: Participant) {
    return this.registrationsRef.add({ ...participant });
  }

  delete(id?: string): Promise<void> {
    return this.registrationsRef.doc(id).delete();
  }

  addCandidateToCourse(courseId: string, participantId: string | undefined) {
    const participant$ = this.db.collection('participants').doc(participantId).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Participant;
        const id = action.payload.id;
        return { id, ...data }; 
      })
    );
  
    return participant$.pipe(
      switchMap((participant) => {
        const courseRef = this.db.collection('courses').doc(courseId);
        return from(courseRef.update({ students: arrayUnion(participant) }));
      })
    );
  }

  getCandidatesByCourseId(courseId: string): Observable<Participant[]> {
    const collectionRef = this.db.collection<Participant>(this.dbPath, (ref) =>
      ref.where('courseId', '==', courseId)
    );

    return collectionRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({
          id: c.payload.doc.id,
          ...(c.payload.doc.data() as Participant),
        }))
      )
    );
  }
}
