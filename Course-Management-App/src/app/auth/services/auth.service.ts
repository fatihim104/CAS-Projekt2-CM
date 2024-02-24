import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { error } from 'cypress/types/jquery';
import { BehaviorSubject, Subject, catchError, map, of } from 'rxjs';
import { User, UserRole } from 'src/app/shared/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  userSubject = new BehaviorSubject<User | null>(null);
  hasToken = new BehaviorSubject<boolean>(false);

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private functions: AngularFireFunctions
  ) {
    const currenUser = localStorage.getItem('user');

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.hasToken.next(true);
        this.userSubject.next(this.userData);
      } else {
        localStorage.setItem('user', 'null');
        this.userSubject.next(null);
        this.hasToken.next(false);
      }
    });
  }

  async signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async signUp(
    email: string,
    password: string,
    sendMail: boolean,
    name?: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        this.setUserData(result.user, name);
        sendMail ? this.sendVerificationMail() : null;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async sendVerificationMail() {
    return this.afAuth.currentUser.then((u: any) => u.sendEmailVerification());
  }

  async forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  setUserData(user: any, name?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      firstName: name,
      displayName: name,
      photoURL: "",
      emailVerified: false,
      role: UserRole.USER,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/auth/sign-in']);
    });
  }

  createUser(email: string, password: string, name?: string) {
    const data = { email, password };
    const callable = this.functions.httpsCallable('createUser');

    return (
      callable(data).pipe(
        map((userRecord) => {
          console.log(userRecord);
          const user = {
            uid : userRecord.userId,
            email: email,
            firstName: name,
            displayName: name,
          }
          
          this.setUserData(user, name);
          return userRecord;
        }),
        catchError((error) => {
          console.error('error by user creation', error);
          return of(null);
        })
      )    
    );
  }
}
