import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularfire2';

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
}
