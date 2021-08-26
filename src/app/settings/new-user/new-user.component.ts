import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css', '../../css/forms.css'],
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;
  newUsersTabs: HeaderTab[];
  showPassword: boolean;

  constructor(private router: Router) {
    //New user form
    this.userForm = new FormGroup(
      {
        uName: new FormControl('', [Validators.required]),
        uLastName: new FormControl(''),
        uAreaCode: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[0-9]*$/),
        ]),
        uPhone: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.pattern(/^[0-9]*$/),
        ]),
        uEmail: new FormControl(''),
        uPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        uRPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        uRole: new FormControl('Administrador'),
        uPhoto: new FormControl(''),
      },
      { validators: passwordValidator }
    );

    function passwordValidator(formGroup: FormGroup) {
      return formGroup.get('uPassword')?.value ===
        formGroup.get('uRPassword')?.value
        ? null
        : { mismatch: true };
    }
    //Navigation tabs
    this.newUsersTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/users',
      },
      {
        active: true,
        icon: 'bx bxs-user-circle',
        navigate: '/users/new',
      },
    ];

    //For showing the password
    this.showPassword = false;
  }

  ngOnInit(): void {}

  submitNewUser = () => {
    console.log(this.userForm.value);
    this.router.navigate(['users']);
  };

  handleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };
}
