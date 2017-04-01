import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../core';
import { ListService } from './list.service';
import { List } from './list.model';

@Component({
  selector: 'lists',
  styleUrls: [ './lists.component.css' ],
  templateUrl: './lists.component.html',
})
export class ListsComponent implements OnInit {
  public addListForm: FormGroup;
  private userId = this.authService.userId;
  private lists = this.af.database.list('/lists');
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

  public addList() {
    const listKey = this.lists.push(new List(this.addListForm.value.name)).key;
    this.af.database.object('/listsPerUser/' + this.userId).update({[listKey]: true});
  }

  private configureForm() {
    this.addListForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
}
