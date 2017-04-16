import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  public authState: FirebaseAuthState;

  constructor(
    public af: AngularFire,
    public auth: AngularFireAuth
  ) {
    auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  public signUp(email: string, password: string) {
    const signUp = this.af.auth.createUser({ email, password });
    const emailHash = btoa(email);

    signUp.then((user) => {
      this.af.database.object(`/users/${emailHash}`).set({
        uid: user.uid,
        email
      });
    }, () => { return; });

    return signUp;
  }

  public logIn(email: string, password: string) {
    return this.af.auth.login({ email, password });
  }

  public logOut() {
    return this.af.auth.logout();
  }

  public resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email);
  }

  get userId() {
    return this.authState.uid;
  }
}
