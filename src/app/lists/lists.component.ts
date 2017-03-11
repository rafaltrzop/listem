import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'lists',
  styleUrls: [ './lists.component.css' ],
  templateUrl: './lists.component.html',
})
export class ListsComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
