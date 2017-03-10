import { Routes } from '@angular/router';

import { HomeComponent } from './home';
import { ListsComponent } from './lists';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lists', component: ListsComponent },
  { path: '**', component: NoContentComponent },
];
