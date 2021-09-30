import { Component, OnInit } from '@angular/core';
import { HeaderTab } from 'src/app/models/HeaderTab';
import { RepairsService } from 'src/app/services/repairs.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersTabs: HeaderTab[];
  loading: boolean = true;
  error: any;
  // ordersData = [
  //   { name: 'Mobiles', value: 105000 },
  //   { name: 'Laptop', value: 55000 },
  //   { name: 'AC', value: 15000 },
  //   { name: 'Headset', value: 150000 },
  //   { name: 'Fridge', value: 20000 },
  // ];
  //ordersData:[{name:string,value:number}]=[{name:"",value:0}];
  ordersData: any[] = [];

  constructor(private repairsService: RepairsService) {
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

  ngOnInit(): void {
    //Refetch the result
    this.repairsService.getQuantityStatusStats().refetch();

    this.repairsService.getQuantityStatusStats().valueChanges.subscribe(
      (result) => {
        this.ordersData = result.data.getQuantityStatusStats;
        this.loading = result.loading;
        this.error = result.error;
      },
      (error) => {
        console.error('Error on QuantityStatusStats:', error);
      }
    );
  }
}
