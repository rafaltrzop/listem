import { Routes } from '@angular/router';

import { LoggedInGuard } from './logged-in-guard.service';
import { HomeComponent } from './home';
import { ListsComponent } from './lists';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'lists',
    component: ListsComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: '**',
    component: NoContentComponent
  },
];
