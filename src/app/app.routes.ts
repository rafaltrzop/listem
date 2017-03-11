import { Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home';
import { ListsComponent } from './lists';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'lists', component: ListsComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: NoContentComponent, canActivate: [ AuthGuard ] },
];
