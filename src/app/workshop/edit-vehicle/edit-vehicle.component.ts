import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderTab } from '../../models/HeaderTab';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css', '../../css/forms.css'],
})
export class EditVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  editVehicleTabs: HeaderTab[];
  loadingSubmit: boolean = false;
  vehicleId: string = '';
  vehicle: any = {};
  brands: any[] = [];
  categories: any[] = [];
  years: string[];
  loading: boolean = true;
  error: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private vehiclesService: VehiclesService,
    private toastr: ToastrService
  ) {
    //Tabs
    this.editVehicleTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/vehicles',
        tooltip: 'Vehículos',
      },
      {
        active: true,
        icon: 'bx bxs-car',
        navigate: '/vehicles/new',
        tooltip: 'Nuevo',
      },
    ];

    // Edit vehicle form
    this.vehicleForm = new FormGroup({
      vBrand: new FormControl('', [Validators.required]),
      vModel: new FormControl('', [Validators.required]),
      vYear: new FormControl('', [Validators.required]),
      vColor: new FormControl(''),
      vCategory: new FormControl(''),
      vPlate: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
    //For the select
    let date = new Date();
    this.years = [];
    for (let i = date.getFullYear(); i > 1950; i--) {
      this.years.push(i.toString());
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.vehicleId = params.id;
    });

    //Get the brands
    this.vehiclesService.getBrands().valueChanges.subscribe(
      (result) => {
        this.brands = result.data.getBrands;
        this.loading = result.data.loading;
        this.error = result.data.error;
      },
      (error) => {
        console.log(error);
      }
    );

    //Get the categories
    this.vehiclesService.getCategories().valueChanges.subscribe(
      (result) => {
        this.categories = result.data.getCategories;
        this.loading = result.data.loading;
        this.error = result.data.error;
      },
      (error) => {
        console.log(error);
      }
    );

    //Get the vehicle data from the db (refetch)
    this.vehiclesService.getVehicle(this.vehicleId).refetch();

    this.vehiclesService
      .getVehicle(this.vehicleId)
      .valueChanges.subscribe((result) => {
        this.vehicle = result?.data?.getVehicle;
        this.loading = result.loading;
        this.error = result.error;
        //Update the form values
        this.vehicleForm.setValue({
          vBrand: this.vehicle.brand,
          vModel: this.vehicle.model,
          vYear: this.vehicle.year,
          vColor: this.vehicle.color,
          vCategory: this.vehicle.category,
          vPlate: this.vehicle.plate,
        });
        this.vehicleForm.updateValueAndValidity();
      });

    //Navigation tabs
    this.editVehicleTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/vehicles',
        tooltip: 'vehiclees',
      },
      {
        active: true,
        icon: 'bx bxs-edit-alt',
        navigate: `/vehicles/edit/${this.vehicleId}`,
        tooltip: 'Editar',
      },
    ];
  }
  updateVehicle = () => {
    //Update the db
    //Loading?
    if (this.loadingSubmit) return;

    //Start loading submit
    this.loadingSubmit = true;
    //Update vehicle
    this.vehiclesService
      .updateVehicle(
        this.vehicleId,
        this.vehicleForm.controls.vBrand.value,
        this.vehicleForm.controls.vModel.value,
        this.vehicleForm.controls.vYear.value,
        this.vehicleForm.controls.vColor.value,
        this.vehicleForm.controls.vCategory.value,
        this.vehicleForm.controls.vPlate.value
      )
      .subscribe(
        (result) => {
          //Send success toast
          this.toastr.success('', 'Actualizado correctamente!');
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error!');
          console.log(error);
        }
      );

    //Redirect to vehicles list
    this.router.navigate(['/vehicles']);
  };
}
