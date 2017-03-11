import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './core/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public canActivate(): Observable<boolean> {
    this.authService.loggedInObserver.subscribe((loggedIn) => {
      if (!loggedIn) {
        this.router.navigate(['']);
      }
    });
    return this.authService.loggedInObserver;
  }
}
