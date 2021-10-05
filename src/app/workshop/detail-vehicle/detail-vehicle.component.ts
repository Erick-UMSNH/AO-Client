import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-detail-vehicle',
  templateUrl: './detail-vehicle.component.html',
  styleUrls: ['./detail-vehicle.component.css'],
})
export class DetailVehicleComponent implements OnInit {
  vehicleDetailTabs: HeaderTab[] = [];
  vehicleId: any;
  vehicle: any = {};
  loading: boolean = true;
  error: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.vehicleId = params.id;
    });
    //Get the vehicle data from the db (refetch)
    this.vehiclesService.getVehicle(this.vehicleId).refetch();

    this.vehiclesService
      .getVehicle(this.vehicleId)
      .valueChanges.subscribe((result) => {
        this.vehicle = result?.data?.getVehicle;
        this.loading = result.loading;
        this.error = result.error;
      });

    this.vehicleDetailTabs = [
      {
        active: false,
        icon: 'bx bxs-wrench',
        navigate: '/workshop',
        tooltip: 'Taller',
      },
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/vehicles',
        tooltip: 'vehiclees',
      },
      {
        active: true,
        icon: 'bx bx-health',
        navigate: `/vehicles/detail/${this.vehicleId}`,
        tooltip: 'Detalle',
      },
    ];
  }
}
