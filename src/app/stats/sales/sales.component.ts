import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { HeaderTab } from 'src/app/models/HeaderTab';
import { RepairsService } from 'src/app/services/repairs.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  salesTabs: HeaderTab[];
  repairData: any[] = [];
  loading: boolean = true;
  error: any;

  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '1990',
          value: 62000000,
        },
        {
          name: '2010',
          value: 73000000,
        },
        {
          name: '2011',
          value: 89400000,
        },
      ],
    },

    // {
    //   name: 'USA',
    //   series: [
    //     {
    //       name: '1990',
    //       value: 250000000,
    //     },
    //     {
    //       name: '2010',
    //       value: 309000000,
    //     },
    //     {
    //       name: '2011',
    //       value: 311000000,
    //     },
    //   ],
    // },

    // {
    //   name: 'France',
    //   series: [
    //     {
    //       name: '1990',
    //       value: 58000000,
    //     },
    //     {
    //       name: '2010',
    //       value: 50000020,
    //     },
    //     {
    //       name: '2011',
    //       value: 58000000,
    //     },
    //   ],
    // },
    // {
    //   name: 'UK',
    //   series: [
    //     {
    //       name: '1990',
    //       value: 57000000,
    //     },
    //     {
    //       name: '2010',
    //       value: 62000000,
    //     },
    //   ],
    // },
  ];
  view: [number, number] = [1000, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Ingreso';
  timeline: boolean = true;

  colorScheme: Color = {
    name: 'Personalized',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#ed2f21'],
  };

  constructor(private repairsService: RepairsService) {
    //Tabs
    this.salesTabs = [
      {
        active: false,
        icon: 'bx bxs-bar-chart-alt-2',
        navigate: '/stats',
        tooltip: 'Estadísticas',
      },
      {
        active: true,
        icon: 'bx bxs-chart',
        navigate: '/stats/sales',
        tooltip: 'Ventas',
      },
    ];
    //Object.assign(this, { multi: this.multi });
  }

  ngOnInit(): void {
    this.repairsService.getRepairsStats('Entregados').refetch();
    this.repairsService.getRepairsStats('Entregados').valueChanges.subscribe(
      (result) => {
        this.repairData = [
          {
            name: 'Ventas',
            series: result.data.getRepairsByStateUnsorted,
          },
        ];
        console.log('DB', this.repairData);
        this.loading = result.loading;
        this.error = result.error;
      },
      (error) => {
        console.error(error);
      }
    );
    console.log('Data:', this.multi);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
