import { Component, OnInit } from '@angular/core';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersTabs: HeaderTab[];
  loading: boolean = true;
  ordersData = [
    { name: 'Mobiles', value: 105000 },
    { name: 'Laptop', value: 55000 },
    { name: 'AC', value: 15000 },
    { name: 'Headset', value: 150000 },
    { name: 'Fridge', value: 20000 },
  ];

  constructor() {
    //Tabs
    this.ordersTabs = [
      {
        active: false,
        icon: 'bx bxs-bar-chart-alt-2',
        navigate: '/stats',
        tooltip: 'Estadísticas',
      },
      {
        active: true,
        icon: 'bx bxs-bar-chart-square',
        navigate: '/stats/sales',
        tooltip: 'Ventas',
      },
    ];
  }

  ngOnInit(): void {}
}
