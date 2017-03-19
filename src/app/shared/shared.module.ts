import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { HeaderComponent } from './component/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [ HeaderComponent ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HeaderComponent
  ]
})
export class SharedModule { }
