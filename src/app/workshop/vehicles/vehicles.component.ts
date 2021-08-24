import { Component, OnInit } from '@angular/core';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  vehiclesTabs: HeaderTab[];

  constructor() {
    this.vehiclesTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/vehicles',
      },
      {
        active: false,
        icon: 'bx bxs-car',
        navigate: '/vehicles/new',
      },
    ];
  }

  ngOnInit(): void {}
}
