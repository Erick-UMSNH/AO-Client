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
    name: 'LineChart',
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
        this.loading = result.loading;
        this.error = result.error;
      },
      (error) => {
        console.error(error);
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
