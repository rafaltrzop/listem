import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core';

@Injectable()
export class ListService {
  private userId = this.authService.userId;

  constructor(
    private af: AngularFire,
    private authService: AuthService
  ) { }

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
        observer.next(this.getUserLists(userListIds));
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