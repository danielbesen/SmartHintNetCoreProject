import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { AppComponent } from './app.component';
import { CustomerService } from './services/customer.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TitleComponent } from './shared/title/title.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './components/filter/filter.component';
import { DatePipe } from '@angular/common';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TitleComponent,
    CustomerComponent,
    ListCustomerComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CollapseModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [CustomerService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
