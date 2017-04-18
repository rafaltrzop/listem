import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListService } from '../list.service';

@Component({
  selector: 'le-rename-list-dialog',
  styleUrls: [ './rename-list-dialog.component.css' ],
  templateUrl: './rename-list-dialog.component.html'
})
export class RenameListDialogComponent implements OnInit {
  public renameListForm: FormGroup;
  public currentListName = this.data.listName;

  constructor(
    private mdDialogRef: MdDialogRef<RenameListDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: { listId: string, listName: string },
    private listService: ListService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public renameList() {
    this.listService.renameList(this.data.listId, this.renameListForm.value.name);
    this.mdDialogRef.close();
  }

  private configureForm() {
    this.renameListForm = new FormGroup({
      name: new FormControl(this.data.listName, Validators.required)
    });
  }
}
