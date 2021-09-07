import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-new-wservice',
  templateUrl: './new-wservice.component.html',
  styleUrls: ['./new-wservice.component.css', '../../css/forms.css'],
})
export class NewWserviceComponent implements OnInit {
  newWserviceTabs: HeaderTab[];
  wserviceForm: FormGroup;

  constructor() {
    //Tabs
    this.newWserviceTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/wservices',
        tooltip: 'Servicios',
      },
      {
        active: true,
        icon: 'bx bxs-car-crash',
        navigate: '/wservices/new',
        tooltip: 'Nuevo',
      },
    ];

    //Vehicle form
    this.wserviceForm = new FormGroup({
      wsName: new FormControl('', [Validators.required]),
      wsCost: new FormControl('', [Validators.required]),
      // wsWork: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  submitNewWservice = () => {
    console.log(this.wserviceForm.value);
  };
}
