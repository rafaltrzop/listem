import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ListService } from '../list.service';
import { SnackBarService } from '../../core/service/snackbar.service';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'le-share-list-dialog',
  styleUrls: [ './share-list-dialog.component.scss' ],
  templateUrl: './share-list-dialog.component.html'
})
export class ShareListDialogComponent implements OnInit {
  public shareListForm: FormGroup;
  public deleteListOwnerForm: FormGroup;
  public listOwners = this.listService.getListOwners(this.data.listId);
  public userEmail = this.authService.userEmail;

  constructor(
    private mdDialogRef: MdDialogRef<ShareListDialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: { listId: string },
    private listService: ListService,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public shareList() {
    this.listService.shareList(this.data.listId, this.shareListForm.value.email).then(() => {
      this.snackBarService.openSnackBar('List has been shared');
      this.mdDialogRef.close();
    }).catch(() => {
      this.snackBarService.openSnackBar('No such user was found');
    });
  }

  public deleteListOwner(userId: string) {
    this.listService.deleteListOwner(this.data.listId, userId);
    this.deleteListOwnerForm.reset();
  }

  private configureForm() {
    this.shareListForm = new FormGroup({
      email: new FormControl(null, Validators.required)
    });

    this.deleteListOwnerForm = new FormGroup({
      owner: new FormControl(null, Validators.required)
    });
  }
}
