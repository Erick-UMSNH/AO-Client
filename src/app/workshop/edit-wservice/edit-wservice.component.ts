import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderTab } from '../../models/HeaderTab';
import { WservicesService } from '../../services/wservices.service';

@Component({
  selector: 'app-edit-wservice',
  templateUrl: './edit-wservice.component.html',
  styleUrls: ['./edit-wservice.component.css', '../../css/forms.css'],
})
export class EditWserviceComponent implements OnInit {
  wserviceForm: FormGroup = new FormGroup({});
  editWserviceTabs: HeaderTab[] = [];
  loadingSubmit: boolean = false;
  wserviceId: string = '';
  wservice: any = {};
  loading: boolean = true;
  error: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private wservicesService: WservicesService,
    private toastr: ToastrService
  ) {
    this.wserviceForm = new FormGroup({
      wsName: new FormControl('', [Validators.required]),
      wsCost: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.wserviceId = params.id;
    });

    //Get the wservice data from the db (refetch)
    this.wservicesService.getWservice(this.wserviceId).refetch();

    this.wservicesService
      .getWservice(this.wserviceId)
      .valueChanges.subscribe((result) => {
        this.wservice = result.data.getWservice;
        this.loading = result.loading;
        this.error = result.error;
        //Update the form values
        this.wserviceForm.setValue({
          wsName: this.wservice.name,
          wsCost: this.wservice.cost,
        });
        this.wserviceForm.updateValueAndValidity();
      });

    //Navigation tabs
    this.editWserviceTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/wservices',
        tooltip: 'Servicios',
      },
      {
        active: true,
        icon: 'bx bxs-edit-alt',
        navigate: `/wservices/edit/${this.wserviceId}`,
        tooltip: 'Editar',
      },
    ];
  }

  updateWservice = () => {
    //Update the db
    //Loading?
    if (this.loadingSubmit) return;

    //Start loading submit
    this.loadingSubmit = true;

    //Update wservice
    this.wservicesService
      .updateWservice(
        this.wserviceId,
        this.wserviceForm.controls.wsName.value,
        this.wserviceForm.controls.wsCost.value
      )
      .subscribe(
        (result) => {
          //Send success toast
          this.toastr.success('', 'Actualizado correctamente!');
          //Redirect to wservices list
          this.router.navigate(['/wservices']);
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error!');
          //Send console error
          console.log(error);
        }
      );
  };
}
