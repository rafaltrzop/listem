import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core';

@Component({
  selector: 'le-header',
  styleUrls: [ './header.component.css' ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
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
