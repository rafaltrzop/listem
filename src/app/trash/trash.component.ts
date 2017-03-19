import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'trash',
  styleUrls: [ './trash.component.css' ],
  templateUrl: './trash.component.html',
})
export class TrashComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
