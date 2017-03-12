import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html',
  providers: [ AuthService ]
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
  private errorMessage: string;

  constructor(
    private authService: AuthService,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public signUp() {
    const signUp = this.authService.signUp(this.form.value.email, this.form.value.password);

    signUp.then((data) => {
      this.logIn();
    }, (error) => {
      this.errorMessage = error.message;
      this.openSnackBar(this.errorMessage, 'OK');
    });
  }

  public logIn() {
    const logIn = this.authService.logIn(this.form.value.email, this.form.value.password);

    logIn.then((data) => {
      this.router.navigate(['lists']);
    }, (error) => {
      this.errorMessage = error.message;
      this.openSnackBar(this.errorMessage, 'OK');
    });
  }

  public resetPassword() {
    this.authService.resetPassword(this.form.value.email);
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
