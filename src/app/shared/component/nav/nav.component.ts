import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core';

@Component({
  selector: 'le-nav',
  styleUrls: [ './nav.component.scss' ],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  public logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
