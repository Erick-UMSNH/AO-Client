import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderTab } from '../../models/HeaderTab';
import { SuppliersService } from '../../services/suppliers.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css', '../../css/forms.css'],
})
export class EditSupplierComponent implements OnInit {
  supplierForm: FormGroup = new FormGroup({});
  editSupplierTabs: HeaderTab[] = [];
  loadingSubmit: boolean = false;
  supplierId: string = '';
  supplier: any = {};
  loading: boolean = true;
  error: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private suppliersService: SuppliersService,
    private toastr: ToastrService
  ) {
    //Edit supplier form
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
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.supplierId = params.id;
    });

    //Get the supplier data from the db (refetch)
    this.suppliersService.getSupplier(this.supplierId).refetch();

    this.suppliersService
      .getSupplier(this.supplierId)
      .valueChanges.subscribe((result) => {
        this.supplier = result?.data?.getSupplier;
        this.loading = result.loading;
        this.error = result.error;
        //Update the form values
        this.supplierForm.setValue({
          sName: this.supplier.name,
          sAreaCode: this.supplier.areaCode,
          sPhone: this.supplier.phone,
          sEmail: this.supplier.email,
        });
        this.supplierForm.updateValueAndValidity();
      });

    //Navigation tabs
    this.editSupplierTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/suppliers',
        tooltip: 'supplieres',
      },
      {
        active: true,
        icon: 'bx bxs-edit-alt',
        navigate: `/suppliers/edit/${this.supplierId}`,
        tooltip: 'Editar',
      },
    ];
  }

  updateSupplier = () => {
    //Update the db
    //Loading?
    if (this.loadingSubmit) return;

    //Start loading submit
    this.loadingSubmit = true;

    //Update supplier
    this.suppliersService
      .updateSupplier(
        this.supplierId,
        this.supplierForm.controls.sName.value,
        this.supplierForm.controls.sAreaCode.value,
        this.supplierForm.controls.sPhone.value,
        this.supplierForm.controls.sEmail.value
      )
      .subscribe(
        (result) => {
          //Send success toast
          this.toastr.success('', 'Actualizado correctamente!');
          //Redirect to suppliers list
          this.router.navigate(['/suppliers']);
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
