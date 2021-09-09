import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { HeaderTab } from '../../models/HeaderTab';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css', '../../css/tables.css'],
})
export class ClientsComponent implements OnInit {
  clientsTabs: HeaderTab[];
  clients: any[] = [];
  clientName: string = '';
  loading: boolean = true;
  error: any;
  showConfirm: boolean = false;
  selectedClientId: string = '';
  p: number = 1;
  filterClient: string = '';

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private toastr: ToastrService
  ) {
    //Tabs
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
    this.getClients();
  }

  getClients = () => {
    //Refetch the data (update values)
    this.clientsService.getClients().refetch();
    //Apply the results
    this.clientsService.getClients().valueChanges.subscribe((result) => {
      this.clients = result?.data?.getClients;
      this.loading = result.loading;
      this.error = result.error;
    });
  };

  clientDetail = (id: string) => {
    this.router.navigate([`/clients/detail/${id}`]);
  };

  editClient = (id: string) => {
    this.router.navigate([`/clients/edit/${id}`]);
  };

  deleteClient = () => {
    //Start loading
    this.loading = true;
    //Delete client
    this.clientsService.deleteClient(this.selectedClientId).subscribe(
      (result) => {
        //Stop loading
        this.loading = false;
        //Send toast
        this.toastr.success('', 'Cliente eliminado!');
        //Refresh clients list
        this.getClients();
      },
      (error) => {
        //Send toast
        this.toastr.error('', 'Ha ocurrido un error!');
        console.log('An error has ocurred:', error);
      }
    );
  };

  openConfirm = (e: any, id: string) => {
    e.stopPropagation();
    this.selectedClientId = id;
  };
}
