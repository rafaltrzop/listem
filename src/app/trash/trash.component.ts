import { Component, OnInit } from '@angular/core';

import { ListService } from '../lists/list.service';

@Component({
  selector: 'trash',
  styleUrls: [ './trash.component.css' ],
  templateUrl: './trash.component.html',
})
export class TrashComponent implements OnInit {
  private userLists = [];

  constructor(
    private listService: ListService
  ) { }

  public ngOnInit() {
    this.listService.observeUserLists().subscribe((userLists) => {
      this.userLists = userLists;
    });
  }
}
