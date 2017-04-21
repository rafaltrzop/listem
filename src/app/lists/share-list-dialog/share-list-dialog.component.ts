import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListService } from '../list.service';
import { SnackBarService } from '../../core/service/snackbar.service';

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
    private listService: ListService,
    private snackBarService: SnackBarService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public shareList() {
    const userEmail = this.shareListForm.value.email;
    this.listService.shareList(this.data.listId, userEmail).then(() => {
      this.snackBarService.openSnackBar(`List has been shared with ${userEmail}`);
      this.mdDialogRef.close();
    }).catch((error) => {
      this.snackBarService.openSnackBar(error);
      this.shareListForm.reset();
    });
  }

  private configureForm() {
    this.shareListForm = new FormGroup({
      email: new FormControl(null, Validators.required)
    });
  }
}
