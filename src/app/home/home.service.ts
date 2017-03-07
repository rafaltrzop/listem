import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class HomeService {
  constructor(public af: AngularFire) { }

  public signUp(email: string, password: string) {
    return this.af.auth.createUser({ email, password });
  }
}
