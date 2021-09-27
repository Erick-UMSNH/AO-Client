import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../css/forms.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {
    this.loginForm = new FormGroup({
      lEmail: new FormControl('', [Validators.required]),
      lPass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitLogin = () => {
    const { lEmail, lPass } = this.loginForm.value;
    this.authService.authenticateUser(lEmail, lPass);
  };

  submitLogin2 = async () => {
    const { lEmail, lPass } = this.loginForm.value;
    const result = await this.usersService.loginUser(lEmail, lPass);
    console.log('Resultado del login: ', result);
  };

  handleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };
}
