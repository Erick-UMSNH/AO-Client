import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderTab } from 'src/app/models/HeaderTab';
import { VehiclesService } from '../../services/vehicles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css', '../../css/tables.css'],
})
export class VehiclesComponent implements OnInit {
  vehiclesTabs: HeaderTab[];
  vehicles: any[] = [];
  loading: boolean = true;
  error: any;
  showConfirm: boolean = false;
  selectedVehicleId: string = '';
  p: number = 1;
  filterVehicle: string = '';

  constructor(
    private router: Router,
    private vehiclesService: VehiclesService,
    private toastr: ToastrService
  ) {
    this.vehiclesTabs = [
      {
        active: false,
        icon: 'bx bxs-wrench',
        navigate: '/workshop',
        tooltip: 'Taller',
      },
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/vehicles',
        tooltip: 'Vehículos',
      },
      {
        active: false,
        icon: 'bx bxs-car',
        navigate: '/vehicles/new',
        tooltip: 'Nuevo',
      },
    ];
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles = () => {
    //Refetch the data (update values)
    this.vehiclesService.getVehicles().refetch();
    //Apply the results
    this.vehiclesService.getVehicles().valueChanges.subscribe((result) => {
      this.vehicles = result?.data?.getVehicles;
      this.loading = result.loading;
      this.error = result.error;
    });
  };

  vehicleDetail = (id: string) => {
    this.router.navigate([`/vehicles/detail/${id}`]);
  };

  editVehicle = (id: string) => {
    this.router.navigate([`/vehicles/edit/${id}`]);
  };

  deleteVehicle = () => {
    //Start loading
    this.loading = true;
    //Delete vehicle
    this.vehiclesService.deleteVehicle(this.selectedVehicleId).subscribe(
      (result) => {
        //Stop loading
        this.loading = false;
        //Send toast
        this.toastr.success('', 'Vehículo eliminado!');
        //Refresh vehicles list
        this.getVehicles();
      },
      (error) => {
        console.log('An error has ocurred:', error);
      }
    );
  };

  openConfirm = (e: any, id: string) => {
    e.stopPropagation();
    this.selectedVehicleId = id;
  };
}
