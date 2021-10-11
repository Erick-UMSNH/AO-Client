import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { GraphQLModule } from './graphql.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditSupplierComponent } from './contacts/edit-supplier/edit-supplier.component';
import { DetailSupplierComponent } from './contacts/detail-supplier/detail-supplier.component';
import { EditVehicleComponent } from './workshop/edit-vehicle/edit-vehicle.component';
import { DetailVehicleComponent } from './workshop/detail-vehicle/detail-vehicle.component';
import { EditUserComponent } from './settings/edit-user/edit-user.component';
import { DetailUserComponent } from './settings/detail-user/detail-user.component';
import { EditWserviceComponent } from './workshop/edit-wservice/edit-wservice.component';
import { DetailWserviceComponent } from './workshop/detail-wservice/detail-wservice.component';
import { EditRepairComponent } from './workshop/edit-repair/edit-repair.component';
import { DetailRepairComponent } from './workshop/detail-repair/detail-repair.component';
import { LoginComponent } from './login/login/login.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MenuStatsComponent } from './stats/menu-stats/menu-stats.component';
import { SalesComponent } from './stats/sales/sales.component';
import { OrdersComponent } from './stats/orders/orders.component';
import { RepservComponent } from './stats/repserv/repserv.component';
import { RepoRepairsComponent } from './workshop/repo-repairs/repo-repairs.component';
import { ClipboardModule } from 'ngx-clipboard';
import { TrackRepairComponent } from './workshop/track-repair/track-repair.component';

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
    EditSupplierComponent,
    DetailSupplierComponent,
    EditVehicleComponent,
    DetailVehicleComponent,
    EditUserComponent,
    DetailUserComponent,
    EditWserviceComponent,
    DetailWserviceComponent,
    EditRepairComponent,
    DetailRepairComponent,
    LoginComponent,
    MenuStatsComponent,
    SalesComponent,
    OrdersComponent,
    RepservComponent,
    RepoRepairsComponent,
    TrackRepairComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
    }),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxChartsModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
