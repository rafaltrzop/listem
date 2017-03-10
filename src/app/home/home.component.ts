import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public signUp() {
    const signUp = this.homeService.signUp(this.form.value.email, this.form.value.password);

    signUp.then((data) => {
      console.log('account created', data); // TODO: remove
      this.logIn();
    }, (error) => {
      this.errorMessage = error.message;
      this.openSnackBar(this.errorMessage, 'OK');
    });
  }

  public logIn() {
    const logIn = this.homeService.logIn(this.form.value.email, this.form.value.password);

    logIn.then((data) => {
      console.log('logged in', data); // TODO: remove
      this.router.navigate(['lists']);
    }, (error) => {
      this.errorMessage = error.message;
      this.openSnackBar(this.errorMessage, 'OK');
    });
  }

  // public logOut() {
  //   console.log('logged out');
  //   this.homeService.logOut();
  // }

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
