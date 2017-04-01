import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../core';
import { List } from './list.model';

@Component({
  selector: 'lists',
  styleUrls: [ './lists.component.css' ],
  templateUrl: './lists.component.html',
})
export class ListsComponent implements OnInit {
  public addListForm: FormGroup;
  private userId = this.authService.userId;
  private lists = this.af.database.list('/lists');
  private listsPerUser = this.af.database.list('/listsPerUser/' + this.userId);
  private userLists = [];

  constructor(
    private af: AngularFire,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.configureForm();
    this.observeUserLists();
  }

  public addList() {
    const listKey = this.lists.push(new List(this.addListForm.value.name)).key;
    this.af.database.object('/listsPerUser/' + this.userId).update({[listKey]: true});
  }

  private configureForm() {
    this.addListForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  private observeUserLists() {
    let listsPerUser = this.af.database.list(
      '/listsPerUser/' + this.userId,
      { preserveSnapshot: true }
    );
    listsPerUser.subscribe((snapshots) => {
      let userListIds = [];
      snapshots.forEach((snapshot) => {
        userListIds.push(snapshot.key);
      });
      this.loadUserLists(userListIds);
    });
  }

  private loadUserLists(userListIds) {
    this.userLists = [];
    for (let listId of userListIds) {
      let list = this.af.database.object('/lists/' + listId);
      this.userLists.push(list);
    }
  }
}
