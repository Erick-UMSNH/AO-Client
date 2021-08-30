import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './contacts/clients/clients.component';
import { SuppliersComponent } from './contacts/suppliers/suppliers.component';
import { NewSupplierComponent } from './contacts/new-supplier/new-supplier.component';
import { NewClientComponent } from './contacts/new-client/new-client.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './bars/navbar/navbar.component';
import { SidebarComponent } from './bars/sidebar/sidebar.component';
import { ResbarComponent } from './bars/resbar/resbar.component';
import { StartComponent } from './home/start/start.component';
import { LocationComponent } from './headers/location/location.component';
import { VehiclesComponent } from './workshop/vehicles/vehicles.component';
import { NewVehicleComponent } from './workshop/new-vehicle/new-vehicle.component';
import { RepairsComponent } from './workshop/repairs/repairs.component';
import { NewRepairComponent } from './workshop/new-repair/new-repair.component';
import { WservicesComponent } from './workshop/wservices/wservices.component';
import { NewWserviceComponent } from './workshop/new-wservice/new-wservice.component';
import { MenuWorkshopComponent } from './workshop/menu-workshop/menu-workshop.component';
import { MenuTitleComponent } from './headers/menu-title/menu-title.component';
import { MenuContactsComponent } from './contacts/menu-contacts/menu-contacts.component';
import { NewUserComponent } from './settings/new-user/new-user.component';
import { MenuSettingsComponent } from './settings/menu-settings/menu-settings.component';
import { UsersComponent } from './settings/users/users.component';
import { EditClientComponent } from './contacts/edit-client/edit-client.component';
import { DetailClientComponent } from './contacts/detail-client/detail-client.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    SuppliersComponent,
    NewSupplierComponent,
    NewClientComponent,
    NavbarComponent,
    SidebarComponent,
    ResbarComponent,
    StartComponent,
    LocationComponent,
    VehiclesComponent,
    NewVehicleComponent,
    RepairsComponent,
    NewRepairComponent,
    WservicesComponent,
    NewWserviceComponent,
    MenuWorkshopComponent,
    MenuTitleComponent,
    MenuContactsComponent,
    UsersComponent,
    NewUserComponent,
    MenuSettingsComponent,
    EditClientComponent,
    DetailClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
