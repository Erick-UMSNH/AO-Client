import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderTab } from 'src/app/models/HeaderTab';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css', '../../css/forms.css'],
})
export class NewSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  newSupplierTabs: HeaderTab[];

  constructor(private router: Router) {
    //New Supplier Form
    this.supplierForm = new FormGroup({
      cName: new FormControl('', [Validators.required]),
      cLastName: new FormControl(''),
      cAreaCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cPhone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^[0-9]*$/),
      ]),
      cEmail: new FormControl(''),
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
        icon: 'bx bxs-user-plus',
        navigate: '/suppliers/new',
        tooltip: 'Nuevo',
      },
    ];
  }

  ngOnInit(): void {}

  submitNewSupplier = () => {
    console.log(this.supplierForm.value);
    this.router.navigate(['suppliers']);
  };
}
