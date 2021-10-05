// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { HeaderTab } from '../../models/HeaderTab';
import { ToastrService } from 'ngx-toastr';

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
  selectedPhoto: any;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    //For showing the password
    this.showPassword = false;
    //Default photo
    this.defaultPhoto = '../../../assets/profile.png';
    //Photo path
    this.photoPath = '';
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
        uPhoto: new FormControl('users/default-user.png'),
      },
      { validators: this.passwordMatchValidator }
    );

    //Navigation tabs
    this.newUsersTabs = [
      {
        active: false,
        icon: 'bx bxs-cog',
        navigate: '/settings',
        tooltip: 'Ajustes',
      },
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
  }

  ngOnInit(): void {}

  submitNewUser = async () => {
    //No selected file?
    if (this.selectedPhoto !== undefined) {
      //Submit the file
      const uploadedFile = await this.usersService.uploadPhoto(
        this.selectedPhoto
      );
      //Errors?
      if (!uploadedFile.hasOwnProperty('error')) {
        this.userForm.controls.uPhoto.setValue(uploadedFile);
      } else {
        console.log('Photo upload failed!');
      }
    }

    //Submit user
    this.usersService
      .createUser(
        this.userForm.controls.uName.value,
        this.userForm.controls.uLastName.value,
        this.userForm.controls.uAreaCode.value,
        this.userForm.controls.uPhone.value,
        this.userForm.controls.uEmail.value,
        this.userForm.controls.uRole.value,
        this.userForm.controls.uPassword.value,
        this.userForm.controls.uRPassword.value,
        this.userForm.controls.uPhoto.value
      )
      .subscribe(
        (result) => {
          //Send success toast
          this.toastr.success('', 'Usuario creado!');
          //Navigate to the users list
          this.router.navigate(['users']);
        },
        (error) => {
          if (error.message === 'Email already used') {
            this.toastr.error('', 'El email ya esta siendo utilizado');
          } else {
            //Send error toast
            this.toastr.error('', 'Ha ocurrido un error');
          }

          //Error types console.log(Object.getOwnPropertyNames(error));

          // console.log(error.stack);
          // console.log(error.graphqlErrors);
          // console.log(error.clientErrors);
          // console.log(error.networkError);
          // console.log(error.message);
          // console.log(error.extraInfo);
        }
      );
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
  photoPreview = async (event: any) => {
    //Read the input file from the page
    this.selectedPhoto = event.target.files[0];
    //Submit the file
    // const result = await this.usersService.uploadPhoto(this.selectedPhoto);
    // console.log(result);
    //No selected file?
    if (this.selectedPhoto === undefined) {
      //Preview the default photo
      this.photoPath = this.defaultPhoto;
      this.userForm.controls.uPhoto.setValue('users/default-user.png');
      return;
    }

    //A file was selected, begin to read
    const reader = new FileReader();
    reader.onload = () => {
      //Set the photo path with the reader
      this.photoPath = reader.result as string;
    };
    //Read the file as data URL
    reader.readAsDataURL(this.selectedPhoto);
  };
}
