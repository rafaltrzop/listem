import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core';
import { List } from './list.model';

@Injectable()
export class ListService {
  private userId = this.authService.userId;
  private lists = this.af.database.list('/lists');

  constructor(
    private af: AngularFire,
    private authService: AuthService
  ) { }

  public addList(name: string) {
    const listKey = this.lists.push(new List(name)).key;
    const updateObject = {
      [`/listsPerUser/${this.userId}/${listKey}`]: true,
      [`/usersPerList/${listKey}/${this.userId}`]: true
    };
    this.af.database.object('/').$ref.update(updateObject);
  }

  public removeList(listId: string) {
    this.af.database.object(`/usersPerList/${listId}`).$ref.once('value').then((userPerList) => {
      const userIds = Object.keys(userPerList.val());
      for (let userId of userIds) {
        this.af.database.object(`/listsPerUser/${userId}/${listId}`).remove();
      }
      this.af.database.object(`/usersPerList/${listId}`).remove();
      this.af.database.object(`/lists/${listId}`).remove();
      this.af.database.object(`/listItems/${listId}`).remove();
    });
  }

  public observeUserLists() {
    return Observable.create((observer) => {
      let listsPerUser = this.af.database.list(
        '/listsPerUser/' + this.userId,
        { preserveSnapshot: true }
      );
      listsPerUser.subscribe((snapshots) => {
        let userListIds = [];
        snapshots.forEach((snapshot) => {
          userListIds.push(snapshot.key);
        });
        observer.next(this.getUserLists(userListIds.reverse()));
      });
    });
  }

  private getUserLists(userListIds) {
    let userLists = [];
    for (let listId of userListIds) {
      let list = this.af.database.object('/lists/' + listId);
      userLists.push(list);
    }
    return userLists;
  }
}
