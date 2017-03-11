import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthService {
  constructor(public af: AngularFire) { }

  public signUp(email: string, password: string) {
    return this.af.auth.createUser({ email, password });
  }

  public logIn(email: string, password: string) {
    return this.af.auth.login({ email, password });
  }

  // public logOut() {
  //   return this.af.auth.logout();
  // }
}
