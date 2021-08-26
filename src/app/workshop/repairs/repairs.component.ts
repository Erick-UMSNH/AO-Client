import { Component, OnInit } from '@angular/core';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css'],
})
export class RepairsComponent implements OnInit {
  repairsTabs: HeaderTab[];

  constructor() {
    this.repairsTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/repairs',
      },
      {
        active: false,
        icon: 'bx bxs-car-mechanic',
        navigate: '/repairs/new',
      },
    ];
  }

  ngOnInit(): void {}
}
