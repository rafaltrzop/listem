import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListService } from '../list.service';

@Component({
  selector: 'le-share-list-dialog',
  styleUrls: [ './share-list-dialog.component.scss' ],
  templateUrl: './share-list-dialog.component.html'
})
export class ShareListDialogComponent implements OnInit {
  public shareListForm: FormGroup;

  constructor(
    private mdDialogRef: MdDialogRef<ShareListDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: { listId: string },
    private listService: ListService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public shareList() {
    this.listService.shareList(this.data.listId, this.shareListForm.value.email);
    this.mdDialogRef.close();
  }

  private configureForm() {
    this.shareListForm = new FormGroup({
      email: new FormControl(null, Validators.required)
    });
  }
}
