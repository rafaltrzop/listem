import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ListService } from './list.service';

@Component({
  selector: 'lists',
  styleUrls: [ './lists.component.scss' ],
  templateUrl: './lists.component.html',
})
export class ListsComponent implements OnInit {
  public addListForm: FormGroup;
  private userLists = [];

  constructor(
    private listService: ListService
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

  public removeList(listId: string) {
    this.listService.removeList(listId);
  }

  private configureForm() {
    this.addListForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
}
