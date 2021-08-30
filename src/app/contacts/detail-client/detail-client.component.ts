import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from 'src/app/models/HeaderTab';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css'],
})
export class DetailClientComponent implements OnInit {
  clientDetailTabs: HeaderTab[] = [];
  clientId: number = 0;
  client: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.clientId = params.id;
    });
    //Get the client data from the db
    this.client = this.clientsService.getClient(this.clientId);

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
        navigate: `/clients/details/${this.clientId}`,
        tooltip: 'Detalle',
      },
    ];
  }
}
