import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { ClientsService } from '../../services/clients.service';
import { VehiclesService } from '../../services/vehicles.service';
import { formatDate } from '@angular/common';
import { WservicesService } from '../../services/wservices.service';
import { RepairsService } from 'src/app/services/repairs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-repair',
  templateUrl: './new-repair.component.html',
  styleUrls: ['./new-repair.component.css', '../../css/forms.css'],
})
export class NewRepairComponent implements OnInit {
  newRepairTabs: HeaderTab[];
  repairForm: FormGroup;

  clients: any[] = [];
  vehicles: any[] = [];
  services: any[] = [];
  loading: boolean = true;
  error: any;
  date: Date = new Date();
  submitLoading: boolean = false;

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private vehiclesService: VehiclesService,
    private wservicesService: WservicesService,
    private repairsService: RepairsService,
    private toastr: ToastrService
  ) {
    //Tabs
    this.newRepairTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/repairs',
        tooltip: 'Reparaciones',
      },
      {
        active: true,
        icon: 'bx bxs-car-mechanic',
        navigate: '/repairs/new',
        tooltip: 'Nueva',
      },
    ];

    //Repair form
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
  }

  submitNewRepair = () => {
    console.log(this.repairForm.value);
    //Check if there is a process running already (submitLoading?)
    if (this.submitLoading) return;
    //Start submitLoading
    this.submitLoading = true;

    //Split date and time
    let sepDateTime = this.repairForm.controls.rDate.value.split('T');
    //Submit repair
    this.repairsService
      .createRepair(
        sepDateTime[0],
        sepDateTime[1],
        this.repairForm.controls.rClient.value,
        this.repairForm.controls.rVehicle.value,
        this.repairForm.controls.rKm.value,
        this.repairForm.controls.rRims.value,
        this.repairForm.controls.rCovers.value,
        this.repairForm.controls.rConcept.value,
        this.repairForm.controls.rService.value,
        'Ingresado',
        5000
      )
      .subscribe(
        (result) => {
          //Send success toast
          this.toastr.success('', 'Orden de reparación creada!');
          //Stop loading
          this.submitLoading = false;
          //Navigate to repairs list
          this.router.navigate(['repairs']);
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error');
          //Stop loading
          this.submitLoading = false;
          console.log('An error has ocurred:', error);
        }
      );
  };
}
