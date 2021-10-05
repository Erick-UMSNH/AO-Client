import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { SuppliersService } from '../../services/suppliers.service';
@Component({
  selector: 'app-detail-supplier',
  templateUrl: './detail-supplier.component.html',
  styleUrls: ['./detail-supplier.component.css'],
})
export class DetailSupplierComponent implements OnInit {
  supplierDetailTabs: HeaderTab[] = [];
  supplierId: any;
  supplier: any = {};
  loading: boolean = true;
  error: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private suppliersService: SuppliersService
  ) {}

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
      });

    this.supplierDetailTabs = [
      {
        active: false,
        icon: 'bx bxs-contact',
        navigate: '/contacts',
        tooltip: 'Contactos',
      },
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/suppliers',
        tooltip: 'Proveedores',
      },
      {
        active: true,
        icon: 'bx bx-health',
        navigate: `/suppliers/detail/${this.supplierId}`,
        tooltip: 'Detalle',
      },
    ];
  }
}
