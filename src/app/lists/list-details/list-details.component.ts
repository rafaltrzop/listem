import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ListDetailsService } from './list-details.service';

@Component({
  selector: 'le-list-details',
  styleUrls: [ './list-details.component.scss' ],
  templateUrl: './list-details.component.html'
})
export class ListDetailsComponent implements OnInit {
  public addListItemForm: FormGroup;
  public listId = this.route.snapshot.params['id']; // TODO: make private?
  public list = this.listDetailsService.getList(this.listId);
  public loadingListItems = true;
  public listItems = [];

  constructor(
    private listDetailsService: ListDetailsService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.configureForm();
    this.listDetailsService.getListItems(this.listId).subscribe((listItems) => {
      this.listItems = listItems;
      this.loadingListItems = false;
    });
  }

  public addListItem() {
    this.listDetailsService.addListItem(this.listId, this.addListItemForm.value.name);
    this.addListItemForm.reset();
  }

  public deleteListItem(itemId: string) {
    this.listDetailsService.deleteListItem(this.listId, itemId);
  }

  public checkItem(itemId: string) {
    this.listDetailsService.toggleItem(this.listId, itemId, true);
  }

  public uncheckItem(itemId: string) {
    this.listDetailsService.toggleItem(this.listId, itemId, false);
  }

  private configureForm() {
    this.addListItemForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }
}
