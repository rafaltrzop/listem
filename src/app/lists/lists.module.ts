import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListsComponent } from './lists.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ ListsComponent ],
  exports: [ ]
})
export class ListsModule { }
