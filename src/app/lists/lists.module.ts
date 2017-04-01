import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListsComponent } from './lists.component';
import { ListService } from './list.service';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ ListsComponent ],
  exports: [ ],
  providers: [ ListService ]
})
export class ListsModule { }
