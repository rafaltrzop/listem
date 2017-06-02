import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListDetailsService } from '../list-details/list-details.service';

@Component({
  selector: 'le-rename-list-item-dialog',
  styleUrls: [ './rename-list-item-dialog.component.scss' ],
  templateUrl: './rename-list-item-dialog.component.html'
})
export class RenameListItemDialogComponent implements OnInit {
  public renameListItemForm: FormGroup;
  public currentListItemName = this.data.itemName;
  public currentListItemDescription = this.data.itemDescription;

  constructor(
    private mdDialogRef: MdDialogRef<RenameListItemDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: {
      listId: string,
      itemId: string,
      itemName: string,
      itemDescription: string
    },
    private listDetailsService: ListDetailsService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public renameListItem() {
    this.listDetailsService.renameListItem(
      this.data.listId,
      this.data.itemId,
      this.renameListItemForm.value.name,
      this.renameListItemForm.value.description
    );
    this.mdDialogRef.close();
  }

  private configureForm() {
    this.renameListItemForm = new FormGroup({
      name: new FormControl(this.data.itemName, Validators.required),
      description: new FormControl(this.data.itemDescription)
    });
  }
}
