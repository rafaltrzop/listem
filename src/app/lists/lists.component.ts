import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material'; // TODO: what about shared module?

import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { ShareListDialogComponent } from './share-list-dialog/share-list-dialog.component';
import { ListService } from './list.service';
import { SnackBarService } from '../core/service/snackbar.service';

@Component({
  selector: 'le-lists',
  styleUrls: [ './lists.component.scss' ],
  templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit {
  private userLists = [];

  constructor(
    private listService: ListService,
    private snackBarService: SnackBarService,
    public mdDialog: MdDialog
  ) { }

  public ngOnInit() {
    this.listService.observeUserLists().subscribe((userLists) => {
      this.userLists = userLists;
    });
  }

  public openAddListDialog() {
    this.mdDialog.open(AddListDialogComponent);
  }

  public openShareListDialog(listId: string) {
    this.mdDialog.open(ShareListDialogComponent, {
      data: { listId }
    });
  }

  public softDeleteList(list) {
    const listId = list.$ref.key;
    this.listService.softDeleteList(listId).then(() => {
      list.subscribe((deletedList) => {
        this.snackBarService.openSnackBar(`List ${deletedList.name} deleted`, 'UNDO')
          .onAction().subscribe(() => {
            this.listService.restoreList(listId);
          }
        );
      });
    });
  }
}
