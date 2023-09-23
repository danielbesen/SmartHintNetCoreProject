import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component';

const routes: Routes = [
  { path: 'customers/list', component: ListCustomerComponent },
  { path: 'customers', redirectTo: 'customers/list' },
  { path: '', redirectTo: 'customers/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
