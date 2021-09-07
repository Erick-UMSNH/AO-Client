import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { ClientsService } from '../../services/clients.service';
import { VehiclesService } from '../../services/vehicles.service';
import { formatDate } from '@angular/common';

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
  loading: boolean = true;
  error: any;
  date: Date = new Date();
  services = [
    { id: 1, name: 'Rectificación de discos' },
    { id: 2, name: 'Mano de Obra' },
    { id: 3, name: 'Presupuesto' },
  ];

  constructor(
    private router: Router,
    private clientsService: ClientsService,
    private vehiclesService: VehiclesService
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
      rKm: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
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
  }

  submitNewRepair = () => {
    console.log(this.repairForm.value);
    this.router.navigate(['/repairs']);
  };
}
