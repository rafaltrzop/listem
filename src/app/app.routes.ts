import { Routes } from '@angular/router';

import { LoggedInGuard } from './logged-in-guard.service';
import { LoggedOutGuard } from './logged-out-guard.service';
import { HomeComponent } from './home';
import { ListsComponent, TrashComponent, ListDetailsComponent } from './lists';
import { PageNotFoundComponent } from './page-not-found';

import { DataResolver } from './app.resolver'; // TODO: remove

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
    component: ListDetailsComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'trash',
    component: TrashComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'trash/:id',
    component: ListDetailsComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];
