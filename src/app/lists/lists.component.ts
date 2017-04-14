import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material'; // TODO: what about shared module?

import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
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

  public softDeleteList(list) {
    const listId = list.$ref.key;
    this.listService.softDeleteList(listId).then(() => {
      // TODO: display list name in the snackbar and restore list
      this.snackBarService.openSnackBar('List XYZ deleted', 'UNDO').onAction().subscribe(() => {
        console.log('restore list method');
      });
    });
  }
}
