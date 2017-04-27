import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseAuthState } from 'angularfire2';

import { AuthService } from './auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public canActivate(): Observable<boolean> {
    return Observable.create((observer) => {
      this.authService.auth.subscribe((state: FirebaseAuthState) => {
        observer.next(state !== null);
        observer.complete();
        if (state === null) {
          this.router.navigate(['']);
        }
      });
    });
  }
}
