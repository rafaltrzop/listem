import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListsComponent } from './lists.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { ListService } from './list.service';
import { ListDetailsService } from './list-details/list-details.service';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    ListsComponent,
    ListDetailsComponent,
    AddListDialogComponent
  ],
  entryComponents: [
    AddListDialogComponent
  ],
  exports: [ ],
  providers: [
    ListService,
    ListDetailsService
  ]
})
export class ListsModule { }
