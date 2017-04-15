import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListService } from '../list.service';

@Component({
  selector: 'le-share-list-dialog',
  styleUrls: [ './share-list-dialog.component.css' ],
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

  public shareList(userId: string) {
    console.log('listId wybranej listy:', this.data.listId);

    this.listService.shareList(this.data.listId, userId);
    this.mdDialogRef.close();

    // this.listService.shareList(this.shareListForm.value.name);
    // this.mdDialogRef.close();
  }

  private configureForm() {
    this.shareListForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
}
