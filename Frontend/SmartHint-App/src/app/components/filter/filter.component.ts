import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { DataService } from 'src/app/services/data.service';
import { ListCustomerComponent } from '../customer/list-customer/list-customer.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public blockTitle: string;
  form: FormGroup;
  isCollapsed = true;
  isFiltering = false;
  constructor(
    private localeService: BsLocaleService,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private listCustomerComponent: ListCustomerComponent
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.blockTitle = 'Selecione uma opção';

    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      registerDate: new FormControl(null),
      isBlocked: new FormControl(null),
    });
  }

  public applyFilter(): void {
    this.isFiltering = true;
    let fm = {
      ...this.form.value,
      isBlocked:
        this.form.value.isBlocked == 'Sim'
          ? true
          : this.form.value.isBlocked == 'Não'
          ? false
          : null,
    };
    fm.registerDate = fm.registerDate || null;
    const customer: Customer = { ...fm };
    this.customerService.getFilteredCustomer(customer).subscribe(
      (_customers: Customer[]) => {
        this.listCustomerComponent.updateData(_customers);
      },
      (error) => console.error(error)
    );
  }

  public cleanForm(): void {
    this.form.reset();
    this.blockTitle = 'Selecione uma opção';
    this.isFiltering = false;
  }

  public cleanFormField(field: string) {
    this.form.get(field)?.reset();
    this.applyFilter();
  }

  get f() {
    return this.form.controls;
  }

  public changeBlockTitle(value: string): void {
    this.blockTitle = value;
  }

  public bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }
}
