import { Component, OnInit } from '@angular/core';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-wservices',
  templateUrl: './wservices.component.html',
  styleUrls: ['./wservices.component.css'],
})
export class WservicesComponent implements OnInit {
  wservicesTabs: HeaderTab[];
  constructor() {
    //Tabs
    this.wservicesTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/wservices',
      },
      {
        active: false,
        icon: 'bx bxs-car-crash',
        navigate: '/wservices/new',
      },
    ];
  }

  ngOnInit(): void {}
}
