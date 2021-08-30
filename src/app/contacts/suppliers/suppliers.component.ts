import { Component, OnInit } from '@angular/core';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  suppliersTabs: HeaderTab[];
  constructor() {
    this.suppliersTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/suppliers',
        tooltip: 'Proovedores',
      },
      {
        active: false,
        icon: 'bx bxs-user-plus',
        navigate: '/suppliers/new',
        tooltip: 'Nuevo',
      },
    ];
  }

  ngOnInit(): void {}
}
