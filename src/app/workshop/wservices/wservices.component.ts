import { Component, OnInit } from '@angular/core';
import { HeaderTab } from '../../models/HeaderTab';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WservicesService } from '../../services/wservices.service';

@Component({
  selector: 'app-wservices',
  templateUrl: './wservices.component.html',
  styleUrls: ['./wservices.component.css', '../../css/tables.css'],
})
export class WservicesComponent implements OnInit {
  wservicesTabs: HeaderTab[];
  wservices: any[] = [];
  wserviceName: string = '';
  loading: boolean = true;
  error: any;
  showConfirm: boolean = false;
  selectedWserviceId: string = '';
  p: number = 1;
  filterWservice: string = '';
  constructor(
    private wservicesService: WservicesService,
    private router: Router,
    private toastr: ToastrService
  ) {
    //Tabs
    this.wservicesTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/wservices',
        tooltip: 'Servicios',
      },
      {
        active: false,
        icon: 'bx bxs-car-crash',
        navigate: '/wservices/new',
        tooltip: 'Nuevo',
      },
    ];
  }

  ngOnInit(): void {
    this.getWservices();
  }

  getWservices = () => {
    //Refetch the data (update values)
    this.wservicesService.getWservices().refetch();
    //Apply the results
    this.wservicesService.getWservices().valueChanges.subscribe((result) => {
      this.wservices = result?.data?.getWservices;
      this.loading = result.loading;
      this.error = result.error;
    });
  };

  wserviceDetail = (id: string) => {
    this.router.navigate([`/wservices/detail/${id}`]);
  };

  editWservice = (id: string) => {
    this.router.navigate([`/wservices/edit/${id}`]);
  };

  deleteWservice = () => {
    //Start loading
    this.loading = true;
    //Delete wservice
    this.wservicesService.deleteWservice(this.selectedWserviceId).subscribe(
      (result) => {
        //Stop loading
        this.loading = false;
        //Send toast
        this.toastr.success('', 'Servicio eliminado!');
        //Refresh wservicess list
        this.getWservices();
      },
      (error) => {
        console.log('An error has ocurred:', error);
      }
    );
  };

  openConfirm = (e: any, id: string) => {
    e.stopPropagation();
    this.selectedWserviceId = id;
  };
}
