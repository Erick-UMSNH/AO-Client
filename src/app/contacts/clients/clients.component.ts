import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from '../../models/Clients';
import { HeaderTab } from '../../models/HeaderTab';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  @Input() receiveToggle: boolean;
  clientsTabs: HeaderTab[];
  clients: any[] = [];

  constructor(private router: Router, private clientsService: ClientsService) {
    this.receiveToggle = false;

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
    this.clients = this.clientsService.getClients();
  }

  clientDetail = (id: number) => {
    console.log('You clicked the person with the name: ', id);
    this.router.navigate([`/clients/detail/${id}`]);
  };

  editClient = (id: number) => {
    this.router.navigate([`/clients/edit/${id}`]);
  };

  deleteClient = (e: any, id: number) => {
    e.stopPropagation();
    console.log('Deleting client: ', id);
  };
}
