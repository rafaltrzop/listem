import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import {
  ResetPasswordDialogComponent
} from './reset-password-dialog/reset-password-dialog.component';
import {
  AboutAppDialogComponent
} from './about-app-dialog/about-app-dialog.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ResetPasswordDialogComponent,
    AboutAppDialogComponent
  ],
  entryComponents: [
    ResetPasswordDialogComponent,
    AboutAppDialogComponent
  ],
  exports: [ ],
  providers: [ ]
})
export class HomeModule { }
