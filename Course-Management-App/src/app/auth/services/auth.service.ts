import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/shared/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  userSubject = new BehaviorSubject<User | null>(null);
  hasToken = new BehaviorSubject<boolean>(false);

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
  
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

  async signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        this.setUserData(result.user);
        this.sendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/auth/verify-email-address']);
      });
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

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: 'user',
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
}