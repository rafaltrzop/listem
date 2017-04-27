import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListDetailsService } from '../list-details/list-details.service';

@Component({
  selector: 'le-add-list-item-dialog',
  styleUrls: [ './add-list-item-dialog.component.css' ],
  templateUrl: './add-list-item-dialog.component.html'
})
export class AddListItemDialogComponent implements OnInit {
  public addListItemForm: FormGroup;

  constructor(
    private mdDialogRef: MdDialogRef<AddListItemDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: { listId: string },
    private listDetailsService: ListDetailsService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public addListItem() {
    this.listDetailsService.addListItem(this.data.listId, this.addListItemForm.value.name);
    this.mdDialogRef.close();
  }

  private configureForm() {
    this.addListItemForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
}
