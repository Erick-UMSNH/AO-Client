import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { HeaderTab } from '../../models/HeaderTab';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from '../../services/clients.service';
import { VehiclesService } from '../../services/vehicles.service';
import { WservicesService } from '../../services/wservices.service';
import { RepairsService } from '../../services/repairs.service';

@Component({
  selector: 'app-edit-repair',
  templateUrl: './edit-repair.component.html',
  styleUrls: ['./edit-repair.component.css', '../../css/forms.css'],
})
export class EditRepairComponent implements OnInit {
  repairForm: FormGroup = new FormGroup({});
  editRepairTabs: HeaderTab[] = [];
  loadingSubmit: boolean = false;
  clients: any[] = [];
  vehicles: any[] = [];
  services: any[] = [];
  repairId: string = '';
  repair: any = {};
  loading: boolean = true;
  error: any;
  date: Date = new Date();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService,
    private vehiclesService: VehiclesService,
    private wservicesService: WservicesService,
    private repairsService: RepairsService,
    private toastr: ToastrService
  ) {
    //Edit repair form
    this.repairForm = new FormGroup({
      rDate: new FormControl(
        formatDate(this.date, 'yyyy-MM-ddTHH:mm:ss', 'en')
      ),
      rClient: new FormControl('', [Validators.required]),
      rVehicle: new FormControl('', [Validators.required]),
      rConcept: new FormControl('', [Validators.required]),
      rKm: new FormControl(''),
      rRims: new FormControl(''),
      rCovers: new FormControl(''),
      rService: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.repairId = params.id;
    });

    //Get clients
    this.clientsService.getClients().refetch();
    this.clientsService.getClients().valueChanges.subscribe(
      (result) => {
        this.clients = result?.data?.getClients;
        this.loading = result.loading;
        this.error = result.error;
      },
      (error) => {
        console.log(error);
      }
    );
    //Get vehicles
    this.vehiclesService.getVehicles().refetch();
    this.vehiclesService.getVehicles().valueChanges.subscribe(
      (result) => {
        this.vehicles = result.data.getVehicles;
        this.loading = result.loading;
        this.error = result.error;
      },
      (error) => {
        console.log(error);
      }
    );
    //Get services
    this.wservicesService.getWservices().refetch();
    this.wservicesService.getWservices().valueChanges.subscribe(
      (result) => {
        this.services = result.data.getWservices;
        this.loading = result.loading;
        this.error = result.error;
      },
      (error) => {
        console.log(error);
      }
    );

    //Navigation tabs
    this.editRepairTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/repairs',
        tooltip: 'Reparaciones',
      },
      {
        active: true,
        icon: 'bx bxs-edit-alt',
        navigate: `/repairs/edit/${this.repairId}`,
        tooltip: 'Editar',
      },
    ];
  }

  updateRepair = () => {
    //Update the db
    //Loading?
    if (this.loadingSubmit) return;

    //Start loading submit
    this.loadingSubmit = true;

    //Split date and time
    let sepDateTime = this.repairForm.controls.rDate.value.split('T');
    //Update repair
    this.repairsService
      .updateRepair(
        this.repairId,
        sepDateTime[0], //This should be changed?
        sepDateTime[1], //same above
        this.repairForm.controls.rClient.value,
        this.repairForm.controls.rVehicle.value,
        this.repairForm.controls.rKm.value,
        this.repairForm.controls.rRims.value,
        this.repairForm.controls.rCovers.value,
        this.repairForm.controls.rConcept.value,
        this.repairForm.controls.rService.value,
        'Ingresado', //This should be changed in another component
        5000 //This is computed
      )
      .subscribe(
        (result) => {
          //Send toast
          this.toastr.success('', 'Actualizado correctamente!');
          //Redirect to repairs list
          this.router.navigate(['/repairs']);
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error!');
          console.log(error);
        }
      );
  };
}
