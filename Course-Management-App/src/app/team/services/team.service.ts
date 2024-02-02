import { Injectable } from '@angular/core';
import { Team } from '../team.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private dbPath = '/team';

  teamRef: AngularFirestoreCollection<Team>;

  constructor(private db: AngularFirestore) {
    this.teamRef = db.collection(this.dbPath);
  }

  getTeacher(id:string){
    return this.teamRef.doc(id).valueChanges();
  }

  getTeachers(): AngularFirestoreCollection<Team> {
    return this.teamRef;
  }

  create(participant: Team) {
    return this.teamRef.add({ ...participant });
  }

  update(id: string, data: any): any {
    return this.teamRef.doc('/'+id).update(data);
  }

  delete(id?: string ): Promise<void> {
    return this.teamRef.doc(id).delete();
  }
}

