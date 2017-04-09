import { Component, OnInit } from '@angular/core';

import { ListService } from '../lists/list.service';

@Component({
  selector: 'le-trash',
  styleUrls: [ './trash.component.css' ],
  templateUrl: './trash.component.html',
})
export class TrashComponent implements OnInit {
  private userLists = [];

  constructor(
    private listService: ListService
  ) { }

  public ngOnInit() {
    this.listService.observeUserLists().subscribe((userLists) => {
      this.userLists = userLists;
    });
  }

  public restoreList(list) {
    const listId = list.$ref.key;
    this.listService.restoreList(listId);
  }

  public hardDeleteList(list) {
    const listId = list.$ref.key;
    this.listService.hardDeleteList(listId);
  }
}
