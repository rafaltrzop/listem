import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AngularFireAuth, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'lists',
  styleUrls: [ './lists.component.css' ],
  templateUrl: './lists.component.html',
})
export class ListsComponent {
  public authState;

  constructor(
    public af: AngularFire,
    public auth: AngularFireAuth,
    private router: Router
  ) {
    this.authState = auth.getAuth();
    auth.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  // get authenticated(): boolean {
  //   return this.authState !== null;
  // }

  public logOut() {
    console.log('logged out');
    this.af.auth.logout();
    this.router.navigate(['']);
  }
}
