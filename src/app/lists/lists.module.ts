import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListsComponent } from './lists.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { ListService } from './list.service';
import { ListDetailsService } from './list-details/list-details.service';

@NgModule({
  imports: [ SharedModule ],
  declarations: [
    ListsComponent,
    ListDetailsComponent
  ],
  exports: [ ],
  providers: [
    ListService,
    ListDetailsService
  ]
})
export class ListsModule { }
