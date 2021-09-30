import { Component, OnInit } from '@angular/core';
import { ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { HeaderTab } from 'src/app/models/HeaderTab';
import { RepairsService } from 'src/app/services/repairs.service';

@Component({
  selector: 'app-repserv',
  templateUrl: './repserv.component.html',
  styleUrls: ['./repserv.component.css'],
})
export class RepservComponent implements OnInit {
  repservTabs: HeaderTab[];
  pieData: any[] = [];
  loading: boolean = false;
  error: any;
  single = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'UK',
      value: 6200000,
    },
  ];

  view: [number, number] = [1000, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    name: 'Pie',
    selectable: true,
    group: ScaleType.Linear,
    domain: [
      'green',
      'yellow',
      'orange',
      'brown',
      'purple',
      'blue',
      'pink',
      'red',
    ],
  };

  constructor(private repairsService: RepairsService) {
    //Tabs
    this.repservTabs = [
      {
        active: false,
        icon: 'bx bxs-bar-chart-alt-2',
        navigate: '/stats',
        tooltip: 'Estadísticas',
      },
      {
        active: true,
        icon: 'bx bxs-pie-chart',
        navigate: '/stats/sales',
        tooltip: 'Ventas',
      },
    ];
  }

  ngOnInit(): void {
    this.repairsService.getQuantityStats().refetch();
    this.repairsService.getQuantityStats().valueChanges.subscribe(
      (result) => {
        this.pieData = result.data.getQuantityStats;
        this.loading = result.loading;
        this.error = result.error;
      },
      (error) => {
        console.log('PieChart Error:', error);
      }
    );
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
