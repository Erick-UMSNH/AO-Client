import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderTab } from '../../models/HeaderTab';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css', '../../css/forms.css'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  editUserTabs: HeaderTab[] = [];
  loadingSubmit: boolean = false;
  userId: string = '';
  user: any = {};
  loading: boolean = true;
  error: any;
  showPassword: boolean;
  defaultPhoto: string;
  photoPath: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
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

    //For showing the password
    this.showPassword = false;
    //Default photo
    this.defaultPhoto = '../../../assets/profile.png';
    //Photo path
    this.photoPath = '';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.userId = params.id;
    });

    //Get the user data from the db (refetch)
    this.usersService.getUser(this.userId).refetch();

    this.usersService.getUser(this.userId).valueChanges.subscribe((result) => {
      this.user = result?.data?.getUser;
      this.loading = result.loading;
      this.error = result.error;
      //Update the form values
      this.userForm.setValue({
        uName: this.user.name,
        uLastName: this.user.lastName,
        uAreaCode: this.user.areaCode,
        uPhone: this.user.phone,
        uEmail: this.user.email,
        uRole: this.user.role,
        uPassword: this.user.password,
        uRPassword: this.user.rpassword,
        uPhoto: this.user.photo,
      });
      this.userForm.updateValueAndValidity();
    });
    //Navigation tabs
    this.editUserTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/users',
        tooltip: 'Usuarios',
      },
      {
        active: true,
        icon: 'bx bxs-edit-alt',
        navigate: `/user/edit/${this.userId}`,
        tooltip: 'Editar',
      },
    ];
  }

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

  /**
   * Show password in the form
   */
  handleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  updateUser = () => {
    //Update the db
    //Loading?
    if (this.loadingSubmit) return;

    //Start loading submit
    this.loadingSubmit = true;

    //Update user
    this.usersService
      .updateUser(
        this.userId,
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
          //Send toast
          this.toastr.success('', 'Actualizado correctamente!');
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error');
          //Send error
          console.log(error);
        }
      );

    //Redirect to user list
    this.router.navigate(['/users']);
  };
}
