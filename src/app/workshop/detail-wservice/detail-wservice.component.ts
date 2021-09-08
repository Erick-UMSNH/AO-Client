import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { WservicesService } from '../../services/wservices.service';
@Component({
  selector: 'app-detail-wservice',
  templateUrl: './detail-wservice.component.html',
  styleUrls: ['./detail-wservice.component.css'],
})
export class DetailWserviceComponent implements OnInit {
  wserviceDetailTabs: HeaderTab[] = [];
  wserviceId: any;
  wservice: any = {};
  loading: boolean = true;
  error: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private wservicesService: WservicesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.wserviceId = params.id;
    });
    //Get the wservice data from the db (refetch)
    this.wservicesService.getWservice(this.wserviceId).refetch();

    this.wservicesService
      .getWservice(this.wserviceId)
      .valueChanges.subscribe((result) => {
        this.wservice = result.data.getWservice;
        this.loading = result.loading;
        this.error = result.error;
      });

    this.wserviceDetailTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/wservices',
        tooltip: 'Servicios',
      },
      {
        active: true,
        icon: 'bx bx-health',
        navigate: `/wservices/detail/${this.wserviceId}`,
        tooltip: 'Detalle',
      },
    ];
  }
}
