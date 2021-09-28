import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderTab } from 'src/app/models/HeaderTab';
import { WservicesService } from 'src/app/services/wservices.service';

@Component({
  selector: 'app-new-wservice',
  templateUrl: './new-wservice.component.html',
  styleUrls: ['./new-wservice.component.css', '../../css/forms.css'],
})
export class NewWserviceComponent implements OnInit {
  newWserviceTabs: HeaderTab[];
  wserviceForm: FormGroup;
  submitLoading: boolean = false;
  loading: boolean = true;
  error: any;

  constructor(
    private router: Router,
    private wservicesService: WservicesService,
    private toastr: ToastrService
  ) {
    //Tabs
    this.newWserviceTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/wservices',
        tooltip: 'Servicios',
      },
      {
        active: true,
        icon: 'bx bxs-car-crash',
        navigate: '/wservices/new',
        tooltip: 'Nuevo',
      },
    ];

    //wservice form
    this.wserviceForm = new FormGroup({
      wsName: new FormControl('', [Validators.required]),
      wsCost: new FormControl('', [Validators.required]),
      wsCategory: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitNewWservice = () => {
    //Check if there is a process running already (submitLoading?)
    if (this.submitLoading) return;
    //Start submitLoading
    this.submitLoading = true;
    //Submit wservice
    this.wservicesService
      .createWservice(
        this.wserviceForm.controls.wsName.value,
        this.wserviceForm.controls.wsCost.value,
        this.wserviceForm.controls.wsCategory.value
      )
      .subscribe(
        (result) => {
          //Send success toast
          this.toastr.success('', 'Servicio creado!');
          //Redirect to wservices list
          this.router.navigate(['/wservices']);
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error');
          console.log('An error has ocurred:', error);
        }
      );
  };
}
