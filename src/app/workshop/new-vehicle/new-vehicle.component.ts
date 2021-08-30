import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css', '../../css/forms.css'],
})
export class NewVehicleComponent implements OnInit {
  newVehiclesTabs: HeaderTab[];
  vehicleForm: FormGroup;
  years: number[];

  constructor(private router: Router) {
    //Tabs
    this.newVehiclesTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/vehicles',
        tooltip: 'Vehículos',
      },
      {
        active: true,
        icon: 'bx bxs-car',
        navigate: '/vehicles/new',
        tooltip: 'Nuevo',
      },
    ];

    //Vehicle form
    this.vehicleForm = new FormGroup({
      vBrand: new FormControl('', [Validators.required]),
      vModel: new FormControl('', [Validators.required]),
      vYear: new FormControl('', [Validators.required]),
      vColor: new FormControl(''),
      vType: new FormControl(''),
      vPlate: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
    //For the select
    let date = new Date();
    this.years = [];
    for (let i = date.getFullYear(); i > 1950; i--) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {}

  submitNewVehicle = () => {
    console.log(this.vehicleForm.value);

    this.router.navigate(['/vehicles']);
  };
}
