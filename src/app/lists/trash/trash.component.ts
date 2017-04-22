import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ListService } from '../list.service';
import { ListOwnersDialogComponent } from '../list-owners-dialog/list-owners-dialog.component';

@Component({
  selector: 'le-trash',
  styleUrls: [ './trash.component.css' ],
  templateUrl: './trash.component.html'
})
export class TrashComponent implements OnInit {
  private userLists = [];

  constructor(
    private listService: ListService,
    public mdDialog: MdDialog
  ) { }

  public ngOnInit() {
    this.listService.observeUserLists().subscribe((userLists) => {
      this.userLists = userLists;
    });
  }

  public openListOwnersDialog(listId: string) {
    this.mdDialog.open(ListOwnersDialogComponent, {
      data: { listId }
    });
  }

  public restoreList(listId: string) {
    this.listService.restoreList(listId);
  }

  public hardDeleteList(listId: string) {
    this.listService.hardDeleteList(listId);
  }
}
