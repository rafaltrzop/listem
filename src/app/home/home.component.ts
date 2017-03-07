import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html',
  providers: [ HomeService ]
})
export class HomeComponent implements OnInit {
  public form: FormGroup;

  constructor(private homeService: HomeService) { }

  public ngOnInit() {
    this.configureForm();
  }

  // TODO
  public logIn() {
    console.log('log in');
    console.log(this.form);
    console.log(this.form.value);
    console.log('form valid: ', this.form.valid);
  }

  public signUp() {
    const signUp = this.homeService.signUp(this.form.value.email, this.form.value.password);

    signUp.then((data) => {
      console.log('account created', data); // TODO: handle success
    }, (error) => {
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(errorCode, errorMessage); // TODO: display message to the user
    });
  }

  private configureForm() {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
}
