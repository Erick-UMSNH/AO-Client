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
  rows: any[] = [];
  total: number = 0;

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
        formatDate(this.date, 'yyyy-MM-ddTHH:mm:ss', 'en'),
        [Validators.required]
      ),
      rClient: new FormControl('', [Validators.required]),
      rVehicle: new FormControl('', [Validators.required]),
      rKm: new FormControl(0),
      rRims: new FormControl(0),
      rCovers: new FormControl(0),
      rConcept: new FormControl('', [Validators.required]),
      rService: new FormControl(''),
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

    //Create repair

    // let repair = {
    //   date: sepDateTime[0],
    //   time: sepDateTime[1],
    //   client: this.repairForm.controls.rClient.value,
    //   vehicle: this.repairForm.controls.rVehicle.value.brand,
    //   km: this.repairForm.controls.rKm.value,
    //   rims: this.repairForm.controls.rRims.value,
    //   covers: this.repairForm.controls.rCovers.value,
    //   concept: this.repairForm.controls.rConcept.value,
    //   service: this.rows,
    //   total: this.total,
    // };

    // console.log('This is the repair form: ', repair);
    //Destructuring client
    const {
      id: cId,
      name: cName,
      lastName: cLastName,
      areaCode: cAreaCode,
      phone: cPhone,
      email: cEmail,
    } = this.repairForm.controls.rClient.value;

    //Destructuring vehicle
    const {
      id: vId,
      brand: vBrand,
      model: vModel,
      year: vYear,
      color: vColor,
      category: vCategory,
      plate: vPlate,
    } = this.repairForm.controls.rVehicle.value;

    console.log(this.repairForm.controls.rVehicle.value);

    //Submit repair
    this.repairsService
      .createRepair(
        sepDateTime[0],
        sepDateTime[1],
        //this.repairForm.controls.rClient.value,
        {
          id: cId,
          name: cName,
          lastName: cLastName,
          areaCode: cAreaCode,
          phone: cPhone,
          email: cEmail,
        },
        //this.repairForm.controls.rVehicle.value.brand,
        {
          id: vId,
          brand: vBrand,
          model: vModel,
          year: vYear,
          color: vColor,
          category: vCategory,
          plate: vPlate,
        },
        this.repairForm.controls.rKm.value,
        this.repairForm.controls.rRims.value,
        this.repairForm.controls.rCovers.value,
        this.repairForm.controls.rConcept.value,
        'Deep service for now!',
        // this.repairForm.controls.rService.value,
        'Ingresado',
        this.total
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

  addRow = () => {
    const service = this.repairForm.controls.rService.value;
    console.log('Service: ', service);
    //No service selected?
    if (service === '' || service === null) {
      //Send toast
      this.toastr.warning('', 'No se ha seleccionado un servicio que agregar');
      return;
    }

    //Destructure the  selected service
    const { id, name, cost, type } = service;

    //Service already selected?
    if (this.rows.find((element) => element.id === id)) {
      //Send toast
      this.toastr.warning('', 'El servicio ya ha sido agregado');
      return;
    }

    //Everything ok
    this.rows.push({
      id,
      name,
      type,
      quantity: 1,
      cost,
      amount: cost,
    });
    //Computes the total of the table amount
    this.total = this.repairsService.getTotal(this.rows);
  };

  deleteRow = (index: number) => {
    //Delete the row at the index
    this.rows.splice(index, 1);
    //Computes the total of the table amount
    this.total = this.repairsService.getTotal(this.rows);
  };

  addQuantity = (index: number) => {
    //Increase quantity by one
    this.rows[index].quantity += 1;
    //Increase the amount (add cost)
    this.rows[index].amount = this.rows[index].amount + this.rows[index].cost;
    //Recompute the total
    this.total = this.repairsService.getTotal(this.rows);
  };

  delQuantity = (index: number) => {
    //Check if the quantity is greater than 1
    if (this.rows[index].quantity > 1) {
      //Decrease the quantity by one
      this.rows[index].quantity -= 1;
      //Decrease the amount (reduce cost)
      this.rows[index].amount = this.rows[index].amount - this.rows[index].cost;
      //Recompute the total
      this.total = this.repairsService.getTotal(this.rows);
    }
  };
}
