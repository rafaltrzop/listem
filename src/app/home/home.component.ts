import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../core/service/auth.service';
import { SnackBarService } from '../core/service/snackbar.service';

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
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  public ngOnInit() {
    this.configureForm();
  }

  public signUp() {
    const signUp = this.authService.signUp(this.form.value.email, this.form.value.password);

    signUp.then(() => {
      this.logIn();
    }, (error) => {
      this.snackBarService.openSnackBar(error.message);
    });
  }

  public logIn() {
    const logIn = this.authService.logIn(this.form.value.email, this.form.value.password);

    logIn.then(() => {
      this.router.navigate(['lists']);
    }, (error) => {
      this.snackBarService.openSnackBar(error.message);
    });
  }

  public resetPassword() {
    this.authService.resetPassword(this.form.value.email).then(() => {
      this.snackBarService.openSnackBar('Check your email inbox');
    }, (error) => {
      this.snackBarService.openSnackBar(error.message);
    });
  }

  private configureForm() {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
}
