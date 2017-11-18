import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListDetailsService } from '../list-details/list-details.service';

@Component({
  selector: 'le-delete-list-item-dialog',
  styleUrls: [ './delete-list-item-dialog.component.scss' ],
  templateUrl: './delete-list-item-dialog.component.html'
})
export class DeleteListItemDialogComponent implements OnInit {
  public deleteListItemForm: FormGroup;
  public itemName = this.data.itemName;

  constructor(
    private mdDialogRef: MdDialogRef<DeleteListItemDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: {
      listId: string,
      itemId: string,
      itemName: string
    },
    private listDetailsService: ListDetailsService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public deleteListItem() {
    this.listDetailsService.deleteListItem(this.data.listId, this.data.itemId);
    this.mdDialogRef.close();
  }

  private configureForm() {
    this.deleteListItemForm = new FormGroup({});
  }
}
