import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import {
  ResetPasswordDialogComponent
} from './reset-password-dialog/reset-password-dialog.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ResetPasswordDialogComponent
  ],
  entryComponents: [
    ResetPasswordDialogComponent
  ],
  exports: [ ],
  providers: [ ]
})
export class HomeModule { }
