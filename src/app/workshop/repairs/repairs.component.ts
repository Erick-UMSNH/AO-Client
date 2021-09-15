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

  /**
   *
   * @param e Click event
   * @param id Id of the repair (to delete)
   */
  openConfirm = (e: any, id: string) => {
    e.stopPropagation();
    this.selectedRepairId = id;
  };

  /**
   * To open the dropdown menu and stop propagation
   * @param e Click event
   */
  openDropdownState = (e: any) => {
    e.stopPropagation();
  };

  /**
   * Change the state of a repair
   * @param e Click event
   * @param id Id of the repair
   * @param state New state
   */
  setState = (e: any, id: string, current: string, state: string) => {
    e.stopPropagation();
    //Check if the current status is the selected one
    if (current === state) {
      //Send toast
      this.toastr.warning('Selecciona otro estado');
    } else {
      this.loading = true;
      //Update the field
      this.repairsService.updateStatusRepair(id, state).subscribe(
        (result) => {
          //Stop loading
          this.loading = false;
          //Send success toast
          this.toastr.success(`Estado cambiado a: ${state}`);
        },
        (error) => {
          //Stop loading
          this.loading = false;
          //Send error toast
          this.toastr.error('No se cambio el estado');
          console.log('Changing state error: ', error);
        }
      );
      this.getRepairs();
    }
  };
}
