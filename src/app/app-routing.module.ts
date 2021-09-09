import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './contacts/clients/clients.component';
import { DetailClientComponent } from './contacts/detail-client/detail-client.component';
import { DetailSupplierComponent } from './contacts/detail-supplier/detail-supplier.component';
import { EditClientComponent } from './contacts/edit-client/edit-client.component';
import { EditSupplierComponent } from './contacts/edit-supplier/edit-supplier.component';
import { MenuContactsComponent } from './contacts/menu-contacts/menu-contacts.component';
import { NewClientComponent } from './contacts/new-client/new-client.component';
import { NewSupplierComponent } from './contacts/new-supplier/new-supplier.component';
import { SuppliersComponent } from './contacts/suppliers/suppliers.component';
import { StartComponent } from './home/start/start.component';
import { DetailUserComponent } from './settings/detail-user/detail-user.component';
import { EditUserComponent } from './settings/edit-user/edit-user.component';
import { MenuSettingsComponent } from './settings/menu-settings/menu-settings.component';
import { NewUserComponent } from './settings/new-user/new-user.component';
import { UsersComponent } from './settings/users/users.component';
import { DetailRepairComponent } from './workshop/detail-repair/detail-repair.component';
import { DetailVehicleComponent } from './workshop/detail-vehicle/detail-vehicle.component';
import { DetailWserviceComponent } from './workshop/detail-wservice/detail-wservice.component';
import { EditRepairComponent } from './workshop/edit-repair/edit-repair.component';
import { EditVehicleComponent } from './workshop/edit-vehicle/edit-vehicle.component';
import { EditWserviceComponent } from './workshop/edit-wservice/edit-wservice.component';
import { MenuWorkshopComponent } from './workshop/menu-workshop/menu-workshop.component';
import { NewRepairComponent } from './workshop/new-repair/new-repair.component';
import { NewVehicleComponent } from './workshop/new-vehicle/new-vehicle.component';
import { NewWserviceComponent } from './workshop/new-wservice/new-wservice.component';
import { RepairsComponent } from './workshop/repairs/repairs.component';
import { VehiclesComponent } from './workshop/vehicles/vehicles.component';
import { WservicesComponent } from './workshop/wservices/wservices.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: StartComponent },
  /* Clients */
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/new', component: NewClientComponent },
  { path: 'clients/edit/:id', component: EditClientComponent },
  { path: 'clients/detail/:id', component: DetailClientComponent },
  /* Suppliers */
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'suppliers/new', component: NewSupplierComponent },
  { path: 'suppliers/edit/:id', component: EditSupplierComponent },
  { path: 'suppliers/detail/:id', component: DetailSupplierComponent },
  /*Vehicles */
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicles/new', component: NewVehicleComponent },
  { path: 'vehicles/edit/:id', component: EditVehicleComponent },
  { path: 'vehicles/detail/:id', component: DetailVehicleComponent },
  /* Repairs */
  { path: 'repairs', component: RepairsComponent },
  { path: 'repairs/new', component: NewRepairComponent },
  { path: 'repairs/edit/:id', component: EditRepairComponent },
  { path: 'repairs/detail/:id', component: DetailRepairComponent },
  /* Services */
  { path: 'wservices', component: WservicesComponent },
  { path: 'wservices/new', component: NewWserviceComponent },
  { path: 'wservices/edit/:id', component: EditWserviceComponent },
  { path: 'wservices/detail/:id', component: DetailWserviceComponent },
  /* Menus */
  { path: 'workshop', component: MenuWorkshopComponent },
  { path: 'contacts', component: MenuContactsComponent },
  { path: 'settings', component: MenuSettingsComponent },
  /* Users */
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: NewUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: 'users/detail/:id', component: DetailUserComponent },
  { path: '**', redirectTo: 'clients' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
