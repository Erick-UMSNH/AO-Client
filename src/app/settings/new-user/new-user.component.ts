import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  defaultPhoto: string;
  photoPath: string;

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
      { validators: this.passwordMatchValidator }
    );

    //Navigation tabs
    this.newUsersTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/users',
        tooltip: 'Usuarios',
      },
      {
        active: true,
        icon: 'bx bxs-user-circle',
        navigate: '/users/new',
        tooltip: 'Nuevo',
      },
    ];

    //For showing the password
    this.showPassword = false;
    //Default photo
    this.defaultPhoto = '../../../assets/profile.png';
    //Photo path
    this.photoPath = '';
    //For the photo
  }

  ngOnInit(): void {}

  submitNewUser = () => {
    console.log(this.userForm.value);
    this.router.navigate(['users']);
  };

  handleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  /**
   * Validates password and confirm password
   * @param group
   * @returns
   */
  passwordMatchValidator = (group: AbstractControl) => {
    return group.get('uPassword')?.value === group.get('uRPassword')?.value
      ? null
      : { mustMatch: true };
  };

  /**
   * Preview an image selected by the user
   * @param event Select image from input
   * @returns void
   */
  photoPreview = (event: any) => {
    //Read the input file from the page
    const file = event.target.files[0];
    console.log('file: ', file);

    //No selected file?
    if (file === undefined) {
      //Preview the default photo
      this.photoPath = this.defaultPhoto;
      return;
    }

    //A file was selected, begin to read
    const reader = new FileReader();
    reader.onload = () => {
      //Set the photo path with the reader
      this.photoPath = reader.result as string;
    };
    //Read the file as data URL
    reader.readAsDataURL(file);
  };
}
