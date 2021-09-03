import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css'],
})
export class DetailClientComponent implements OnInit {
  clientDetailTabs: HeaderTab[] = [];
  clientId: any;
  client: any = {};
  loading: boolean = true;
  error: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.clientId = params.id;
    });
    //Get the client data from the db (refetch)
    this.clientsService.getClient(this.clientId).refetch();

    this.clientsService
      .getClient(this.clientId)
      .valueChanges.subscribe((result) => {
        this.client = result?.data?.getClient;
        this.loading = result.loading;
        this.error = result.error;
      });

    this.clientDetailTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/clients',
        tooltip: 'Clientes',
      },
      {
        active: true,
        icon: 'bx bx-health',
        navigate: `/clients/detail/${this.clientId}`,
        tooltip: 'Detalle',
      },
    ];
  }
}
