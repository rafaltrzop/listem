import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { HomeService } from './home.service';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html',
  providers: [ HomeService ]
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
  private errorMessage: string;

  constructor(
    private homeService: HomeService,
    private snackBar: MdSnackBar
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  // TODO
  public logIn() {
    console.log('log in');
    console.log('form: ', this.form);
    console.log('form values: ', this.form.value);
    console.log('form valid: ', this.form.valid);
  }

  public signUp() {
    const signUp = this.homeService.signUp(this.form.value.email, this.form.value.password);

    signUp.then((data) => {
      console.log('account created', data); // TODO: handle success
    }, (error) => {
      this.errorMessage = error.message;
      this.openSnackBar(this.errorMessage, 'OK');
    });
  }

  private configureForm() {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
