import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      lEmail: new FormControl('', [Validators.required]),
      lPass: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitLogin = () => {
    const { lEmail, lPass } = this.loginForm.value;
    this.usersService.authenticateUser(lEmail, lPass).valueChanges.subscribe(
      (result) => {
        console.log(result);
        this.router.navigate(['/home']);
      },
      (error) => {
        if (error.message === 'Wrong password') {
          //Send toast
          this.toastr.warning('Contraseña incorrecta');
        } else if (error.message === 'User not found') {
          //Send toast
          this.toastr.warning('El usuario no existe');
        } else {
          //Send toast
          this.toastr.error('Ha ocurrido un error');
          console.log(error);
        }
      }
    );
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
