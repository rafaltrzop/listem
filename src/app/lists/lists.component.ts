import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../core';
import { ListService } from './list.service';

@Component({
  selector: 'lists',
  styleUrls: [ './lists.component.scss' ],
  templateUrl: './lists.component.html',
})
export class ListsComponent implements OnInit {
  public addListForm: FormGroup;
  private userId = this.authService.userId;
  private userLists = [];

  constructor(
    private af: AngularFire,
    private authService: AuthService,
    private listService: ListService
  ) { }

  public ngOnInit() {
    this.configureForm();
    this.listService.observeUserLists().subscribe((userLists) => {
      this.userLists = userLists;
    });
  }

  public addList(name: string) {
    this.listService.addList(name);
  }

  public removeList(listId) {
    // this.listService.removeList();
    this.af.database.object('/lists/' + listId).remove();
    this.af.database.object('/listsPerUser/' + this.userId + '/' + listId).remove();

    console.log('remove list method');
  }

  private configureForm() {
    this.addListForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
}
