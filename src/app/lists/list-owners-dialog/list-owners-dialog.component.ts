import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';

import { ListService } from '../list.service';
import { AuthService } from '../../core';

@Component({
  selector: 'le-list-owners-dialog',
  styleUrls: [ './list-owners-dialog.component.scss' ],
  templateUrl: './list-owners-dialog.component.html'
})
export class ListOwnersDialogComponent implements OnInit {
  public deleteListOwnerForm: FormGroup;
  public listOwners = this.listService.getListOwners(this.data.listId);
  public currentUserEmail = this.authService.userEmail;

  constructor(
    @Inject(MD_DIALOG_DATA) private data: { listId: string },
    private listService: ListService,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public deleteListOwner(userId: string) {
    this.listService.deleteListOwner(this.data.listId, userId);
    this.deleteListOwnerForm.reset();
  }

  private configureForm() {
    this.deleteListOwnerForm = new FormGroup({
      owner: new FormControl(null, Validators.required)
    });
  }
}
