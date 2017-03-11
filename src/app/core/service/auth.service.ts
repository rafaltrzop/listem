import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public authState: FirebaseAuthState;
  public loggedInObserver: Observable<boolean>;

  constructor(
    public af: AngularFire,
    public auth: AngularFireAuth,
  ) {
    this.authState = auth.getAuth();
    this.loggedInObserver = Observable.create((observer) => {
      auth.subscribe((state: FirebaseAuthState) => {
        this.authState = state;
        observer.next(this.authState !== null);
        observer.complete();
      });
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
