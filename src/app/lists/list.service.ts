import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core';
import { List } from './list.model';

@Injectable()
export class ListService {
  private userId = this.authService.userId;
  private userEmail = this.authService.userEmail;

  constructor(
    private af: AngularFire,
    private authService: AuthService
  ) { }

  public addList(listName: string) {
    const listId = this.af.database.list('/lists').push(new List(listName)).key;
    const updateObject = {
      [`/listsPerUser/${this.userId}/${listId}`]: true,
      [`/usersPerList/${listId}/${this.userId}`]: { email: this.userEmail }
    };
    this.af.database.object('/').$ref.update(updateObject);
  }

  public renameList(listId: string, listName: string) {
    this.af.database.object(`/lists/${listId}`).update({ name: listName });
  }

  public getListName(listId: string) {
    return this.af.database.object(`/lists/${listId}/name`).$ref.once('value');
  }

  public getListOwners(listId: string) {
    return this.af.database.list(`/usersPerList/${listId}`, {
      query: {
        orderByChild: 'email'
      }
    });
  }

  public deleteListOwner(listId: string, userId: string) {
    this.af.database.object(`/usersPerList/${listId}/${userId}`).remove();
    this.af.database.object(`/listsPerUser/${userId}/${listId}`).remove();
    this.af.database.object(`/lists/${listId}/ownersCount`).$ref
      .transaction((ownersCount) => {
        return ownersCount - 1;
      });
  }

  public shareList(listId: string, userEmail: string) {
    return new Promise((resolve, reject) => {
      this.getUserIdByEmail(userEmail).then((user) => {
        const userData = user.val();
        if (userData) {
          const userId = userData.uid;
          this.af.database.object(`/listsPerUser/${userId}/${listId}`).$ref.once('value').then((list) => {
            if (list.val() !== null) {
              reject(`User ${userEmail} already owns the list`);
            } else {
              const updateObject = {
                [`/listsPerUser/${userId}/${listId}`]: true,
                [`/usersPerList/${listId}/${userId}`]: { email: userEmail }
              };
              this.af.database.object('/').$ref.update(updateObject);
              this.af.database.object(`/lists/${listId}/ownersCount`).$ref
                .transaction((ownersCount) => {
                  return ownersCount + 1;
                });
              resolve(true);
            }
          });
        } else {
          reject('No such user was found');
        }
      });
    });
  }

  public softDeleteList(listId: string) {
    return this.af.database.object(`/lists/${listId}`).update({ softDeleted: true });
  }

  public restoreList(listId: string) {
    this.af.database.object(`/lists/${listId}`).update({ softDeleted: false });
  }

  public hardDeleteList(listId: string) {
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
        `/listsPerUser/${this.userId}`,
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
      let list = this.af.database.object(`/lists/${listId}`);
      userLists.push(list);
    }
    return userLists;
  }

  private getUserIdByEmail(email: string) {
    const emailHash = btoa(email);
    return this.af.database.object(`/users/${emailHash}`).$ref.once('value');
  }
}
