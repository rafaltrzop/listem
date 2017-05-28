import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MdDialogModule,
  MdToolbarModule,
  MdCardModule,
  MdListModule,
  MdInputModule,
  MdRadioModule,
  MdCheckboxModule,
  MdMenuModule,
  MdIconModule,
  MdTooltipModule,
  MdButtonModule,
  MdSnackBarModule
} from '@angular/material';
import 'hammerjs';

import { NavComponent } from './component/nav/nav.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MdDialogModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdRadioModule,
    MdCheckboxModule,
    MdMenuModule,
    MdIconModule,
    MdTooltipModule,
    MdButtonModule,
    MdSnackBarModule
  ],
  declarations: [
    NavComponent,
    HeaderComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MdDialogModule,
    MdToolbarModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdRadioModule,
    MdCheckboxModule,
    MdMenuModule,
    MdIconModule,
    MdTooltipModule,
    MdButtonModule,
    MdSnackBarModule,
    NavComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
