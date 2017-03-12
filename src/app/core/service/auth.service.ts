import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  public authState: FirebaseAuthState;

  constructor(
    public af: AngularFire,
    public auth: AngularFireAuth,
  ) {
    auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  public signUp(email: string, password: string) {
    return this.af.auth.createUser({ email, password });
  }

  public logIn(email: string, password: string) {
    return this.af.auth.login({ email, password });
  }

  public logOut() {
    return this.af.auth.logout();
  }

  // TODO: add snackbar messages
  public resetPassword(email: string) {
    let auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then(() => {
      console.log('email sent');
    }, (error) => {
      console.log('enail not sent', error);
      console.log(error.message);
    });
  }
}
