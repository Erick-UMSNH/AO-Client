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
  editRepairTabs: HeaderTab[] = [];
  repairForm: FormGroup = new FormGroup({});
  clients: any[] = [];
  vehicles: any[] = [];
  services: any[] = [];
  loading: boolean = true;
  error: any;
  date: Date = new Date();
  loadingSubmit: boolean = false;
  repairId: string = '';
  repair: any = {};
  rows: any[] = [];
  total: number = 0;

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
      rComments: new FormControl(''),
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
    //Get the repair data from the db
    this.repairsService.getRepair(this.repairId).refetch();

    this.repairsService
      .getRepair(this.repairId)
      .valueChanges.subscribe((result) => {
        this.repair = result?.data?.getRepair;
        this.loading = result.loading;
        this.error = result.error;

        //Get the service rows, make a deep copy of the array
        this.rows = JSON.parse(JSON.stringify(this.repair.service));
        //Delete typename property
        // for (let index = 0; index < this.rows.length; index++) {
        //   delete this.rows[index].__typename;
        // }
        //Get the total
        this.total = this.repair.total;

        //Update the form values
        this.repairForm.setValue({
          rDate: this.repair.date + 'T' + this.repair.time,
          rClient: this.repair.client,
          rVehicle: this.repair.vehicle,
          rKm: this.repair.km,
          rRims: this.repair.rims,
          rCovers: this.repair.covers,
          rConcept: this.repair.concept,
          rService: this.repair.service,
          rComments: this.repair.comments,
        });
        this.repairForm.updateValueAndValidity();
      });

    //Navigation tabs
    this.editRepairTabs = [
      {
        active: false,
        icon: 'bx bxs-wrench',
        navigate: '/workshop',
        tooltip: 'Taller',
      },
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

    //Update repair
    this.repairsService
      .updateRepair(
        this.repairId,
        sepDateTime[0], //This should be changed?
        sepDateTime[1], //same above
        //Client
        {
          id: cId,
          name: cName,
          lastName: cLastName,
          areaCode: cAreaCode,
          phone: cPhone,
          email: cEmail,
        },
        //Vehicle
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
        //Service
        this.rows,
        //Status
        this.repair.status,
        //Total
        this.total,
        this.repairForm.controls.rComments.value
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

  addRow = () => {
    const service = this.repairForm.controls.rService.value;
    console.log('Service: ', service);
    //No service selected?
    if (service === '' || service === null || Array.isArray(service)) {
      //Send toast
      this.toastr.warning('', 'No se ha seleccionado un servicio que agregar');
      return;
    }

    //Destructure the  selected service
    const { id, name, cost, category } = service;

    //Service already selected?
    if (this.rows.find((element) => element.id === id)) {
      //Send toast
      this.toastr.warning('', 'El servicio ya ha sido agregado');
      return;
    }
    console.log('Rows: ', this.rows);
    //Everything ok, add the row
    this.rows.push({
      id,
      name,
      category,
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
    console.log('ROWS: ', this.rows);
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

  updateCost = (e: any, index: number) => {
    //Update cost
    this.rows[index].cost = parseFloat(e.target.value);
    //Update amount value
    this.rows[index].amount = this.rows[index].cost * this.rows[index].quantity;
    //Update total
    this.total = this.repairsService.getTotal(this.rows);
    console.log('Rows in cost: ', this.rows);
  };

  updateQuantity = (e: any, index: number) => {
    //Update quantity
    this.rows[index].quantity = parseInt(e.target.value);
    //Update amount value
    this.rows[index].amount = this.rows[index].cost * this.rows[index].quantity;
    //Update total
    this.total = this.repairsService.getTotal(this.rows);
    console.log('Rows in quantity: ', this.rows);
  };
}
