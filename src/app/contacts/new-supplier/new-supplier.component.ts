import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css'],
})
export class NewSupplierComponent implements OnInit {
  supplierForm: FormGroup;

  constructor(private router: Router) {
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
  }

  ngOnInit(): void {}

  submitNewSupplier = () => {
    console.log(this.supplierForm.value);
    this.router.navigate(['suppliers']);
  };
}
