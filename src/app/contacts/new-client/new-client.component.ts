import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css', '../../css/forms.css'],
})
export class NewClientComponent implements OnInit {
  clientForm: FormGroup;
  newClientsTabs: HeaderTab[];
  submitLoading: boolean = false;

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private toastr: ToastrService
  ) {
    //New client form
    this.clientForm = new FormGroup({
      cName: new FormControl('', [Validators.required]),
      cLastName: new FormControl(''),
      cAreaCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cEmail: new FormControl(''),
    });
    //Navigation tabs
    this.newClientsTabs = [
      {
        active: false,
        icon: 'bx bxs-contact',
        navigate: '/contacts',
        tooltip: 'Contactos',
      },
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/clients',
        tooltip: 'Clientes',
      },
      {
        active: true,
        icon: 'bx bxs-user-plus',
        navigate: '/clients/new',
        tooltip: 'Nuevo',
      },
    ];
  }

  ngOnInit(): void {}

  submitNewClient = () => {
    //Check if there is a process running already (submitLoading?)
    if (this.submitLoading) return;
    //Start submitLoading
    this.submitLoading = true;
    //Submit client
    this.clientsService
      .createClient(
        this.clientForm.controls.cName.value,
        this.clientForm.controls.cLastName.value,
        this.clientForm.controls.cAreaCode.value,
        this.clientForm.controls.cPhone.value,
        this.clientForm.controls.cEmail.value
      )
      .subscribe(
        (result) => {
          //Send success toast
          this.toastr.success('', 'Cliente creado!');
          //Navigate to clients list
          this.router.navigate(['clients']);
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error');
          console.log('An error has ocurred:', error);
        }
      );
  };
}
