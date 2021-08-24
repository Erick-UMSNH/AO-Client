import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: [
    '../clients/clients.component.css',
    './new-client.component.css',
    '../../css/forms.css',
  ],
})
export class NewClientComponent implements OnInit {
  clientForm: FormGroup;
  newClientsTabs: HeaderTab[];

  constructor(private router: Router) {
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
        icon: 'bx bx-food-menu',
        navigate: '/clients',
      },
      {
        active: true,
        icon: 'bx bxs-user-plus',
        navigate: '/clients/new',
      },
    ];
  }

  ngOnInit(): void {}

  submitNewClient = () => {
    console.log(this.clientForm.value);
    this.router.navigate(['clients']);
  };
}
