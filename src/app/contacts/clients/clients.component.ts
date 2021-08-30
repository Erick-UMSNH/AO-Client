import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from '../../models/Clients';
import { HeaderTab } from '../../models/HeaderTab';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clientsTabs: HeaderTab[];
  clients: any[] = [];
  loading: boolean = true;
  error: any;

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private apollo: Apollo
  ) {
    this.clientsTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/clients',
        tooltip: 'Clientes',
      },
      {
        active: false,
        icon: 'bx bxs-user-plus',
        navigate: '/clients/new',
        tooltip: 'Nuevo',
      },
    ];
  }
  ngOnInit(): void {
    this.clientsService.getClients().subscribe((result) => {
      this.clients = result?.data?.clients;
      console.log('Inside value changes: ', this.clients);
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  clientDetail = (id: string) => {
    console.log('You clicked the person with the name: ', id);
    this.router.navigate([`/clients/detail/${id}`]);
  };

  editClient = (id: string) => {
    this.router.navigate([`/clients/edit/${id}`]);
  };

  deleteClient = (e: any, id: string) => {
    e.stopPropagation();
    console.log('Deleting client: ', id);
  };
}
