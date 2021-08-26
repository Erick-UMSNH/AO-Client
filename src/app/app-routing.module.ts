import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './contacts/clients/clients.component';
import { NewClientComponent } from './contacts/new-client/new-client.component';
import { NewSupplierComponent } from './contacts/new-supplier/new-supplier.component';
import { SuppliersComponent } from './contacts/suppliers/suppliers.component';
import { StartComponent } from './home/start/start.component';
import { NewRepairComponent } from './workshop/new-repair/new-repair.component';
import { NewVehicleComponent } from './workshop/new-vehicle/new-vehicle.component';
import { NewWserviceComponent } from './workshop/new-wservice/new-wservice.component';
import { RepairsComponent } from './workshop/repairs/repairs.component';
import { VehiclesComponent } from './workshop/vehicles/vehicles.component';
import { WservicesComponent } from './workshop/wservices/wservices.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: StartComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/new', component: NewClientComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'suppliers/new', component: NewSupplierComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicles/new', component: NewVehicleComponent },
  { path: 'repairs', component: RepairsComponent },
  { path: 'repairs/new', component: NewRepairComponent },
  { path: 'wservices', component: WservicesComponent },
  { path: 'wservices/new', component: NewWserviceComponent },
  { path: '**', redirectTo: 'clients' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
