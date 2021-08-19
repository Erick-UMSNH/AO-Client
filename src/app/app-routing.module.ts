import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './contacts/clients/clients.component';
import { NewClientComponent } from './contacts/new-client/new-client.component';
import { NewSupplierComponent } from './contacts/new-supplier/new-supplier.component';
import { SuppliersComponent } from './contacts/suppliers/suppliers.component';
import { StartComponent } from './home/start/start.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: StartComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/new', component: NewClientComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'suppliers/new', component: NewSupplierComponent },
  { path: '**', redirectTo: 'clients' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
