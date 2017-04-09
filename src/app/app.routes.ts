import { Routes } from '@angular/router';

import { LoggedInGuard } from './logged-in-guard.service';
import { LoggedOutGuard } from './logged-out-guard.service';
import { HomeComponent } from './home';
import { ListsComponent } from './lists';
import { TrashComponent } from './trash';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ LoggedOutGuard ]
  },
  {
    path: 'lists',
    component: ListsComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'lists/:id',
    component: ListsComponent, // TODO: create list details component
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'trash',
    component: TrashComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: '**',
    component: NoContentComponent
  },
];
