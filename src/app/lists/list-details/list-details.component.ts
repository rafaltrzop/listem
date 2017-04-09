import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListService } from '../list.service';

@Component({
  selector: 'le-list-details',
  styleUrls: [ './list-details.component.css' ],
  templateUrl: './list-details.component.html',
})
export class ListDetailsComponent {
  private listId = this.route.snapshot.params['id'];
  public listName = this.listService.getList(this.listId);
  public listItems = this.listService.getListItems(this.listId);

  constructor(
    private listService: ListService,
    private route: ActivatedRoute
  ) { }
}
