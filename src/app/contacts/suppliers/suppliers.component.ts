import { Component, OnInit } from '@angular/core';
import { HeaderTab } from '../../models/HeaderTab';
import { SuppliersService } from '../../services/suppliers.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css', '../../css/tables.css'],
})
export class SuppliersComponent implements OnInit {
  suppliersTabs: HeaderTab[];
  suppliers: any[] = [];
  supplierName: string = '';
  loading: boolean = true;
  error: any;
  showConfirm: boolean = false;
  selectedSupplierId: string = '';
  p: number = 1;
  filterSupplier: string = '';

  constructor(
    private router: Router,
    private suppliersService: SuppliersService,
    private toastr: ToastrService
  ) {
    this.suppliersTabs = [
      {
        active: false,
        icon: 'bx bxs-contact',
        navigate: '/contacts',
        tooltip: 'Contactos',
      },
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/suppliers',
        tooltip: 'Proovedores',
      },
      {
        active: false,
        icon: 'bx bxs-business',
        navigate: '/suppliers/new',
        tooltip: 'Nuevo',
      },
    ];
  }

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers = () => {
    //Refetch the data (update values)
    this.suppliersService.getSuppliers().refetch();
    //Apply the results
    this.suppliersService.getSuppliers().valueChanges.subscribe((result) => {
      this.suppliers = result?.data?.getSuppliers;
      this.loading = result.loading;
      this.error = result.error;
    });
  };

  supplierDetail = (id: string) => {
    this.router.navigate([`/suppliers/detail/${id}`]);
  };

  editSupplier = (id: string) => {
    this.router.navigate([`/suppliers/edit/${id}`]);
  };

  deleteSupplier = () => {
    //Start loading
    this.loading = true;
    //Delete supplier
    this.suppliersService.deleteSupplier(this.selectedSupplierId).subscribe(
      (result) => {
        //Stop loading
        this.loading = false;
        //Send toast
        this.toastr.success('', 'Proveedor eliminado!');
        //Refresh Supplierss list
        this.getSuppliers();
      },
      (error) => {
        console.log('An error has ocurred:', error);
      }
    );
  };

  openConfirm = (e: any, id: string) => {
    e.stopPropagation();
    this.selectedSupplierId = id;
  };
}
