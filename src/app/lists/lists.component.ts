import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ListService } from './list.service';
import { SnackBarService } from '../core/service/snackbar.service';

@Component({
  selector: 'le-lists',
  styleUrls: [ './lists.component.scss' ],
  templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit {
  public addListForm: FormGroup;
  private userLists = [];

  constructor(
    private listService: ListService,
    private snackBarService: SnackBarService
  ) { }

  public ngOnInit() {
    this.configureForm();
    this.listService.observeUserLists().subscribe((userLists) => {
      this.userLists = userLists;
    });
  }

  public addList() {
    this.listService.addList(this.addListForm.value.name);
    this.addListForm.reset();
  }

  public softDeleteList(list) {
    const listId = list.$ref.key;
    this.listService.softDeleteList(listId).then(() => {
      // TODO: display list name in the snackbar and restore list
      this.snackBarService.openSnackBar('List XYZ deleted', 'UNDO').onAction().subscribe(() => {
        console.log('restore list method');
      });
    });
  }

  private configureForm() {
    this.addListForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
}
