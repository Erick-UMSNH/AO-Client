import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Clients';
import { HeaderTab } from 'src/app/models/HeaderTab';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css', '../../css/forms.css'],
})
export class EditClientComponent implements OnInit {
  clientForm: FormGroup = new FormGroup({});
  editClientTabs: HeaderTab[] = [];
  loading: boolean;
  clientID: number;
  client: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService
  ) {
    this.clientID = 0;
    this.loading = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.clientID = params.id;
    });
    //Get the client data from the db
    this.client = this.clientsService.getClient(this.clientID);

    //Edit client form (with values)
    this.clientForm = new FormGroup({
      cName: new FormControl(this.client.name, [Validators.required]),
      cLastName: new FormControl(this.client.lastName),
      cAreaCode: new FormControl(this.client.areaCode, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cPhone: new FormControl(this.client.phone, [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cEmail: new FormControl(this.client.email),
    });
    //Navigation tabs
    this.editClientTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/clients',
        tooltip: 'Clientes',
      },
      {
        active: true,
        icon: 'bx bxs-edit-alt',
        navigate: `/clients/edit/${this.clientID}`,
        tooltip: 'Editar',
      },
    ];
  }

  updateClient = () => {
    //Update the db
    //Loading?
    if (this.loading) return;

    //Start loading
    this.loading = true;
    //Redirect to clients list
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/clients']);
    }, 3000);
  };
}
