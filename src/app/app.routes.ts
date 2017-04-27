import { Routes } from '@angular/router';

import { LoggedInGuard, LoggedOutGuard } from './core';
import { HomeComponent } from './home';
import { ListsComponent, TrashComponent, ListDetailsComponent } from './lists';
import { PageNotFoundComponent } from './page-not-found';

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
