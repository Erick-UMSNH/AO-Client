import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-new-repair',
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.css', '../../css/forms.css'],
})
export class NewRepairComponent implements OnInit {
  newRepairTabs: HeaderTab[];
  repairForm: FormGroup;

  clients = [
    { id: 1, name: 'Erick' },
    { id: 2, name: 'Alberto' },
    { id: 3, name: 'Edgar' },
    { id: 4, name: 'Santiago' },
  ];

  vehicles = [
    { id: 1, name: 'Jetta' },
    { id: 2, name: 'Mazda 3' },
    { id: 3, name: 'Sentra' },
    { id: 4, name: 'Tsuru' },
  ];

  services = [
    { id: 1, name: 'Rectificación de discos' },
    { id: 2, name: 'Mano de Obra' },
    { id: 3, name: 'Presupuesto' },
  ];

  constructor(private router: Router) {
    //Tabs
    this.newRepairTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/repairs',
        tooltip: 'Reparaciones',
      },
      {
        active: true,
        icon: 'bx bxs-car-mechanic',
        navigate: '/repairs/new',
        tooltip: 'Nueva',
      },
    ];

    //Repair form
    this.repairForm = new FormGroup({
      rDate: new FormControl(''),
      rClient: new FormControl('', [Validators.required]),
      rVehicle: new FormControl('', [Validators.required]),
      rConcept: new FormControl('', [Validators.required]),
      rKm: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
      rService: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitNewRepair = () => {
    console.log(this.repairForm.value);
    this.router.navigate(['/repairs']);
  };
}
