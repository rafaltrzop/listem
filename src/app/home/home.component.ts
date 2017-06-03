import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { AuthService, SnackBarService } from '../core';
import {
  ResetPasswordDialogComponent
} from './reset-password-dialog/reset-password-dialog.component';
import {
  AboutAppDialogComponent
} from './about-app-dialog/about-app-dialog.component';

@Component({
  selector: 'le-home',
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html',
  providers: [
    AuthService,
    SnackBarService
  ]
})
export class HomeComponent implements OnInit {
  public authForm: FormGroup;

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router,
    private mdDialog: MdDialog
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public signUp() {
    this.authService.signUp(this.authForm.value.email, this.authForm.value.password).then(() => {
      this.logIn();
    }).catch((error) => {
      this.snackBarService.openSnackBar(error.message);
    });
  }

  public logIn() {
    this.authService.logIn(this.authForm.value.email, this.authForm.value.password).then(() => {
      this.router.navigate(['lists']);
    }).catch((error) => {
      this.snackBarService.openSnackBar(error.message);
    });
  }

  public openResetPasswordDialog() {
    this.mdDialog.open(ResetPasswordDialogComponent);
  }

  public openAboutAppDialog() {
    this.mdDialog.open(AboutAppDialogComponent);
  }

  private configureForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
}
