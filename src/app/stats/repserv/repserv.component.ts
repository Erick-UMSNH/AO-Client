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
  toggle: boolean = false;
  toggleStatus: string = 'Cambiar a vista simple';
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
      '#003f5c',
      '#2f4b7c',
      '#665191',
      '#a05195',
      '#d45087',
      '#f95d6a',
      '#ff7c43',
      '#ffa600',
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
    this.repairsService.getQuantityServiceStats().refetch();
    this.repairsService.getQuantityServiceStats().valueChanges.subscribe(
      (result) => {
        this.pieData = result.data.getQuantityServiceStats;
        this.loading = result.loading;
        this.error = result.error;
      },
      (error) => {
        console.log('PieChart Error:', error);
      }
    );
  }

  toggleChart = () => {
    this.toggle = !this.toggle;
    this.toggleStatus === 'Cambiar a vista simple'
      ? (this.toggleStatus = 'Cambiar a vista avanzada')
      : (this.toggleStatus = 'Cambiar a vista simple');
  };

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
