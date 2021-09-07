import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderTab } from '../../models/HeaderTab';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css', '../../css/forms.css'],
})
export class EditClientComponent implements OnInit {
  clientForm: FormGroup = new FormGroup({});
  editClientTabs: HeaderTab[] = [];
  loadingSubmit: boolean = false;
  clientId: string = '';
  client: any = {};
  loading: boolean = true;
  error: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService,
    private toastr: ToastrService
  ) {
    //Edit client form
    this.clientForm = new FormGroup({
      cName: new FormControl('', [Validators.required]),
      cLastName: new FormControl(''),
      cAreaCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cEmail: new FormControl(''),
    });
  }

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
        //Update the form values
        this.clientForm.setValue({
          cName: this.client.name,
          cLastName: this.client.lastName,
          cAreaCode: this.client.areaCode,
          cPhone: this.client.phone,
          cEmail: this.client.email,
        });
        this.clientForm.updateValueAndValidity();
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
        navigate: `/clients/edit/${this.clientId}`,
        tooltip: 'Editar',
      },
    ];
  }

  updateClient = () => {
    //Update the db
    //Loading?
    if (this.loadingSubmit) return;

    //Start loading submit
    this.loadingSubmit = true;

    //Update client
    this.clientsService
      .updateClient(
        this.clientId,
        this.clientForm.controls.cName.value,
        this.clientForm.controls.cLastName.value,
        this.clientForm.controls.cAreaCode.value,
        this.clientForm.controls.cPhone.value,
        this.clientForm.controls.cEmail.value
      )
      .subscribe(
        (result) => {
          //Send toast
          this.toastr.success('', 'Actualizado correctamente!');
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error!');
          console.log(error);
        }
      );

    //Redirect to clients list
    this.router.navigate(['/clients']);
  };
}
