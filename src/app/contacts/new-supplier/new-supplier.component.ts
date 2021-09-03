import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { ToastrService } from 'ngx-toastr';
import { SuppliersService } from '../../services/suppliers.service';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css', '../../css/forms.css'],
})
export class NewSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  newSupplierTabs: HeaderTab[];
  submitLoading: boolean = false;

  constructor(
    private router: Router,
    private suppliersService: SuppliersService,
    private toastr: ToastrService
  ) {
    //New Supplier Form
    this.supplierForm = new FormGroup({
      sName: new FormControl('', [Validators.required]),
      sAreaCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[0-9]*$/),
      ]),
      sPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^[0-9]*$/),
      ]),
      sEmail: new FormControl(''),
    });
    // Header Tabs
    this.newSupplierTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/suppliers',
        tooltip: 'Proveedores',
      },
      {
        active: true,
        icon: 'bx bxs-business',
        navigate: '/suppliers/new',
        tooltip: 'Nuevo',
      },
    ];
  }

  ngOnInit(): void {}

  submitNewSupplier = () => {
    //Check if there is a process running already (submitLoading?)
    if (this.submitLoading) return;
    //Start submitLoading
    this.submitLoading = true;
    //Submit supplier
    this.suppliersService
      .createSupplier(
        this.supplierForm.controls.sName.value,
        this.supplierForm.controls.sAreaCode.value,
        this.supplierForm.controls.sPhone.value,
        this.supplierForm.controls.sEmail.value
      )
      .subscribe(
        (result) => {
          //Send success toast
          this.toastr.success('', 'Proovedor creado!');
          //Navigate to suppliers list
          this.router.navigate(['suppliers']);
        },
        (error) => {
          //Send error toast
          this.toastr.error('', 'Ha ocurrido un error');
          console.log('An error has ocurred:', error);
        }
      );
  };
}
