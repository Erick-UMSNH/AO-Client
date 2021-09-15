import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../css/forms.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor() {
    this.loginForm = new FormGroup({
      lEmail: new FormControl('', [Validators.required]),
      lPass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitLogin = () => {
    console.log(this.loginForm.value);
  };

  handleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };
}
