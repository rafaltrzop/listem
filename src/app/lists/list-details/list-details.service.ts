import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { Item } from './item.model';

@Injectable()
export class ListDetailsService {
  constructor(
    private af: AngularFire
  ) { }

  public addListItem(listId: string, name: string) {
    this.af.database.list(`/listItems/${listId}`).push(new Item(name));
  }

  public getList(listId: string) {
    return this.af.database.object(`/lists/${listId}`);
  }

  public getListItems(listId: string) {
    return this.af.database.list(`/listItems/${listId}`, {
      query: {
        orderByChild: 'name'
      }
    });
  }

  public toggleItem(listId: string, itemId: string, checked: boolean) {
    this.af.database.object(`/listItems/${listId}/${itemId}`).update({ checked });
  }
}
