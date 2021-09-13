import { Component, OnInit } from '@angular/core';
import { HeaderTab } from '../../models/HeaderTab';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RepairsService } from 'src/app/services/repairs.service';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css', '../../css/tables.css'],
})
export class RepairsComponent implements OnInit {
  repairsTabs: HeaderTab[];
  repairs: any[] = [];
  repairName: string = '';
  loading: boolean = true;
  error: any;
  showConfirm: boolean = false;
  selectedRepairId: string = '';
  p: number = 1;
  filterRepair: string = '';

  constructor(
    private router: Router,
    private repairsService: RepairsService,
    private toastr: ToastrService
  ) {
    //Tabs
    this.repairsTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/repairs',
        tooltip: 'Reparaciones',
      },
      {
        active: false,
        icon: 'bx bxs-car-mechanic',
        navigate: '/repairs/new',
        tooltip: 'Nueva',
      },
    ];
  }

  ngOnInit(): void {
    this.getRepairs();
  }

  getRepairs = () => {
    //Refetch the data (update values)
    this.repairsService.getRepairs().refetch();
    //Apply the results
    this.repairsService.getRepairs().valueChanges.subscribe((result) => {
      this.repairs = result.data.getRepairs;
      this.loading = result.loading;
      this.error = result.error;

      console.log('RESULT: ', result);
    });
  };

  repairDetail = (id: string) => {
    this.router.navigate([`/repairs/detail/${id}`]);
  };

  editRepair = (id: string) => {
    this.router.navigate([`/repairs/edit/${id}`]);
  };

  deleteRepair = () => {
    //Start loading
    this.loading = true;
    //Delete repair
    this.repairsService.deleteRepair(this.selectedRepairId).subscribe(
      (result) => {
        //Stop loading
        this.loading = false;
        //Send toast
        this.toastr.success('', 'Orden de reparación eliminada!');
        //Refresh repairs list
        this.getRepairs();
      },
      (error) => {
        //Send toast
        this.toastr.error('', 'Ha ocurrido un error!');
        console.log('An error has ocurred:', error);
      }
    );
  };

  openConfirm = (e: any, id: string) => {
    e.stopPropagation();
    this.selectedRepairId = id;
  };
}
