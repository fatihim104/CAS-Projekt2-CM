import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Participant } from '../../../participant/participant.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseRegistrationService {
  private dbPath = '/registrations';

  registrationsRef: AngularFirestoreCollection<Participant>;

  constructor(private db: AngularFirestore) {
    this.registrationsRef = db.collection(this.dbPath);
  }

  create(participant: Participant) {
    return this.registrationsRef.add({ ...participant });
  }

  getCandidatesByCourseId(courseId: string): Observable<Participant[]> {
    const collectionRef = this.db.collection<Participant>(this.dbPath, (ref) =>
      ref.where('courseId', '==', courseId)
    );

    return collectionRef.valueChanges().pipe(
      map((candidates) => {
        return candidates;
      })
    );
  }
}
