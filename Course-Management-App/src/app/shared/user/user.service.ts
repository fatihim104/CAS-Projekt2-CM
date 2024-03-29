import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  acceptMailRef: AngularFirestoreCollection<User>;
  
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    
  ) {
    this.acceptMailRef = firestore.collection('/acceptMails');
  }

  getCurrentUser():Observable<User | undefined> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        return user
          ? this.firestore
              .collection('users')
              .doc<User>(user.uid)
              .valueChanges()
          : of(undefined);
      })
    );
  }

  getUsers():Observable<User[] >{
    return this.firestore.collection('users').valueChanges().pipe(
      map(users => users.map(user => (
        {
          ...user as User
        }
      )))
    )
  }

  update(id:string | undefined, data:User){
    return this.firestore.collection('users').doc('/'+id).update(data)
  }

  addUserForMailTrigger(user:User){
    return this.acceptMailRef.add({...user})
  }

}
