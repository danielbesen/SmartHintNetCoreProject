import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component';
import { DetailCustomerComponent } from './components/customer/detail-customer/detail-customer.component';

const routes: Routes = [
  { path: 'customers/list', component: ListCustomerComponent },
  { path: 'customers', redirectTo: 'customers/list' },
  {
    path: 'customers',
    component: CustomerComponent,
    children: [
      { path: 'list', component: ListCustomerComponent },
      { path: 'detail', component: DetailCustomerComponent },
      { path: 'detail/:id', component: DetailCustomerComponent },
    ],
  },
  { path: '', redirectTo: 'customers/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
