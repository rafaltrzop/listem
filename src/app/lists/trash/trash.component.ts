import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { ListService } from '../list.service';
import { SnackBarService } from '../../core/service/snackbar.service';
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
    private snackBarService: SnackBarService,
    public mdDialog: MdDialog
  ) { }

  public ngOnInit() {
    this.listService.observeFilteredUserLists(true).subscribe((userLists) => {
      this.userLists = userLists;
    });
  }

  public openListOwnersDialog(listId: string) {
    this.mdDialog.open(ListOwnersDialogComponent, {
      data: { listId }
    });
  }

  public restoreList(listId: string) {
    this.listService.restoreList(listId).then(() => {
      this.listService.getListName(listId).then((listName) => {
        this.snackBarService.openSnackBar(`List ${listName.val()} has been recovered`, 'UNDO')
          .onAction().subscribe(() => {
            this.listService.softDeleteList(listId);
          }
        );
      });
    });
  }

  public hardDeleteList(listId: string) {
    this.listService.getListName(listId).then((listName) => {
      this.listService.hardDeleteList(listId).then(() => {
        this.snackBarService.openSnackBar(`List ${listName.val()} has been removed`);
      });
    });
  }
}
