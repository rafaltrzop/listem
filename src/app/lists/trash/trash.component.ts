import { Component, OnInit } from '@angular/core';

import { ListService } from '../list.service';

@Component({
  selector: 'le-trash',
  styleUrls: [ './trash.component.css' ],
  templateUrl: './trash.component.html'
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

  public restoreList(listId: string) {
    this.listService.restoreList(listId);
  }

  public hardDeleteList(listId: string) {
    this.listService.hardDeleteList(listId);
  }
}
