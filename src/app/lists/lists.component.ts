import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { RenameListDialogComponent } from './rename-list-dialog/rename-list-dialog.component';
import { ShareListDialogComponent } from './share-list-dialog/share-list-dialog.component';
import { ListOwnersDialogComponent } from './list-owners-dialog/list-owners-dialog.component';
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

  public openRenameListDialog(listId: string) {
    this.listService.getListName(listId).then((listName) => {
      this.mdDialog.open(RenameListDialogComponent, {
        data: {
          listId,
          listName: listName.val()
        }
      });
    });
  }

  public openShareListDialog(listId: string) {
    this.mdDialog.open(ShareListDialogComponent, {
      data: { listId }
    });
  }

  public openListOwnersDialog(listId: string) {
    this.mdDialog.open(ListOwnersDialogComponent, {
      data: { listId }
    });
  }

  public softDeleteList(listId: string) {
    this.listService.getListName(listId).then((listName) => {
      this.listService.softDeleteList(listId).then(() => {
        this.snackBarService.openSnackBar(`List ${listName.val()} has been deleted`, 'UNDO')
          .onAction().subscribe(() => {
            this.listService.restoreList(listId);
          }
        );
      });
    });
  }
}
