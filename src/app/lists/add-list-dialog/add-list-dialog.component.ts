import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { ListService } from '../list.service';

@Component({
  selector: 'le-add-list-dialog',
  styleUrls: [ './add-list-dialog.component.css' ],
  templateUrl: './add-list-dialog.component.html'
})
export class AddListDialogComponent implements OnInit {
  public addListForm: FormGroup;

  constructor(
    private mdDialogRef: MdDialogRef<AddListDialogComponent>,
    private listService: ListService
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public addList() {
    this.listService.addList(this.addListForm.value.name);
    this.mdDialogRef.close();
  }

  private configureForm() {
    this.addListForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
}
