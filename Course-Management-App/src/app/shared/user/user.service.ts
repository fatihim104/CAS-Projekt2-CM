import { inject, Injectable } from '@angular/core';
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
  private authService = inject(AuthService);
  private afAuth = inject(AngularFireAuth);
  private firestore = inject(AngularFirestore);

  private acceptMailRef: AngularFirestoreCollection<User>;
  
  constructor() {
    this.acceptMailRef = this.firestore.collection('/acceptMails');
  }

  getCurrentUser():Observable<User | undefined> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        console.log('Auth state user:', user); 
        return user
          ? this.firestore
              .collection('users')
              .doc<User>(user.uid)
              .valueChanges()
              .pipe(
                map((userData) => {
                  console.log('Firestore user data:', userData);
                  return userData;
                })
              )
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
