import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { ToastrService } from 'ngx-toastr';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css', '../../css/forms.css'],
})
export class NewVehicleComponent implements OnInit {
  newVehiclesTabs: HeaderTab[];
  vehicleForm: FormGroup;
  years: string[];
  submitLoading: boolean = false;
  loading: boolean = true;
  brands: any[] = [];
  categories: any[] = [];
  error: any;

  constructor(
    private router: Router,
    private vehiclesService: VehiclesService,
    private toastr: ToastrService
  ) {
    //Tabs
    this.newVehiclesTabs = [
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

    //Vehicle form
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
  }

  submitNewVehicle = () => {
    //Check if there is a process running already (submitLoading?)
    if (this.submitLoading) return;
    //Start submitLoading
    this.submitLoading = true;
    //Submit vehicle
    this.vehiclesService
      .createVehicle(
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
          this.toastr.success('', 'Vehículo creado!');
          //Redirect to vehicles list
          this.router.navigate(['/vehicles']);
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error');
          console.log('An error has ocurred:', error);
        }
      );
  };
}
