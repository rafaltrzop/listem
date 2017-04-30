import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AppState } from './app.service';

@Component({
  selector: 'le-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    public appState: AppState,
    private router: Router
  ) { }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state); // TODO: remove

    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
