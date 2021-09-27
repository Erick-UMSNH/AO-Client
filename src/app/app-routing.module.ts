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
import { AuthGuard } from './guards/auth.guard';
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
  // { path: 'login', component: LoginComponent },

  /* Clients */
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  {
    path: 'clients/new',
    component: NewClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients/edit/:id',
    component: EditClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients/detail/:id',
    component: DetailClientComponent,
    canActivate: [AuthGuard],
  },
  /* Suppliers */
  {
    path: 'suppliers',
    component: SuppliersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suppliers/new',
    component: NewSupplierComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suppliers/edit/:id',
    component: EditSupplierComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suppliers/detail/:id',
    component: DetailSupplierComponent,
    canActivate: [AuthGuard],
  },
  /*Vehicles */
  { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard] },
  {
    path: 'vehicles/new',
    component: NewVehicleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicles/edit/:id',
    component: EditVehicleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicles/detail/:id',
    component: DetailVehicleComponent,
    canActivate: [AuthGuard],
  },
  /* Repairs */
  { path: 'repairs', component: RepairsComponent, canActivate: [AuthGuard] },
  {
    path: 'repairs/new',
    component: NewRepairComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'repairs/edit/:id',
    component: EditRepairComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'repairs/detail/:id',
    component: DetailRepairComponent,
    canActivate: [AuthGuard],
  },
  /* Services */
  {
    path: 'wservices',
    component: WservicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wservices/new',
    component: NewWserviceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wservices/edit/:id',
    component: EditWserviceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wservices/detail/:id',
    component: DetailWserviceComponent,
    canActivate: [AuthGuard],
  },
  /* Menus */
  {
    path: 'workshop',
    component: MenuWorkshopComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contacts',
    component: MenuContactsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: MenuSettingsComponent,
    canActivate: [AuthGuard],
  },
  /* Users */
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: NewUserComponent, canActivate: [AuthGuard] },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/detail/:id',
    component: DetailUserComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
