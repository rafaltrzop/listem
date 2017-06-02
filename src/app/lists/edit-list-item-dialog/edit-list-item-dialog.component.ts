import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListDetailsService } from '../list-details/list-details.service';

@Component({
  selector: 'le-edit-list-item-dialog',
  styleUrls: [ './edit-list-item-dialog.component.scss' ],
  templateUrl: './edit-list-item-dialog.component.html'
})
export class EditListItemDialogComponent implements OnInit {
  public editListItemForm: FormGroup;
  public currentListItemName = this.data.itemName;
  public currentListItemDescription = this.data.itemDescription;

  constructor(
    private mdDialogRef: MdDialogRef<EditListItemDialogComponent>,
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

  public editListItem() {
    this.listDetailsService.editListItem(
      this.data.listId,
      this.data.itemId,
      this.editListItemForm.value.name,
      this.editListItemForm.value.description
    );
    this.mdDialogRef.close();
  }

  private configureForm() {
    this.editListItemForm = new FormGroup({
      name: new FormControl(this.data.itemName, Validators.required),
      description: new FormControl(this.data.itemDescription)
    });
  }
}
