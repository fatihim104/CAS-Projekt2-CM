import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  getCurrentUser():Observable<User | undefined> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        return user
          ? this.firestore
              .collection('users')
              .doc<User>(user.uid)
              .valueChanges()
          : [];
      })
    );
  }
}
