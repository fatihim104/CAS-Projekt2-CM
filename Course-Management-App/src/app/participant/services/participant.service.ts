import { Injectable } from '@angular/core';
import { Participant } from '../participant.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private dbPath = '/participants';

  participantsRef: AngularFirestoreCollection<Participant>;

  constructor(private db: AngularFirestore) {
    this.participantsRef = db.collection(this.dbPath);
  }

  getParticipant(id:string){
    return this.participantsRef.doc(id).valueChanges();
  }

  getParticipants(): Observable<Participant[]> {
    return this.participantsRef.snapshotChanges().pipe(
      map(changes => changes.map((c) => {
        const studentData = c.payload.doc.data();
        return({
          id: c.payload.doc.id,
          name: `${studentData.firstName} ${studentData.lastName}`,
          ...(c.payload.doc.data() as Participant),
        });        
      })
      )
    );;
  }

  create(participant: Participant) {
    return this.participantsRef.add({ ...participant });
  }

  update(id: string, data: any): any {
    return this.participantsRef.doc('/'+id).update(data);
  }

  delete(id?: string ): Promise<void> {
    return this.participantsRef.doc(id).delete();
  }
}
