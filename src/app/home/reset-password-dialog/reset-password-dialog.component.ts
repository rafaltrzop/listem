import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

import { AuthService, SnackBarService } from '../../core';

@Component({
  selector: 'le-reset-password-dialog',
  styleUrls: [ './reset-password-dialog.component.css' ],
  templateUrl: './reset-password-dialog.component.html'
})
export class ResetPasswordDialogComponent implements OnInit {
  public resetPasswordForm: FormGroup;

  constructor(
    private mdDialogRef: MdDialogRef<ResetPasswordDialogComponent>,
    private authService: AuthService,
    private snackBarService: SnackBarService,
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public resetPassword() {
    this.authService.resetPassword(this.resetPasswordForm.value.email).then(() => {
      this.snackBarService.openSnackBar('Check your email inbox');
      this.mdDialogRef.close();
    }).catch((error) => {
      this.snackBarService.openSnackBar(error.message);
    });
  }

  private configureForm() {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, Validators.required)
    });
  }
}
