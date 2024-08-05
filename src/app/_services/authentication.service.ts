import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../_interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public auth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null || '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }
  // Login in with email/password
  SignIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  RegisterUser(email: any, password: any) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  // Email verification when new user register
  SendVerificationMail() {
    return this.auth.currentUser.then((user: any) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['login']);
      });
    });
  }
  // Recover password
  PasswordRecover(passwordResetEmail: any) {
    return this.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
      window.alert(
        'Password reset email has been sent, please check your inbox.'
      );
      })
      .catch((error: any) => {
      window.alert(error);
      });
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified !== false ? true : false;
  }

  // Auth providers
  AuthLogin(provider: any) {
    return this.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign-out
  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
