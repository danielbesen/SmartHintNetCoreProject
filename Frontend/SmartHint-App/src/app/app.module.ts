import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CustomerService } from './services/customer.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TitleComponent } from './shared/title/title.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, TitleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule,
    BrowserAnimationsModule,
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
