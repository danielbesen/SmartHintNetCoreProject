import {
  Component,
  ElementRef,
  Injectable,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { DataService } from 'src/app/services/data.service';
import { ListCustomerComponent } from '../customer/list-customer/list-customer.component';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';

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
  public filterPagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(
    private localeService: BsLocaleService,
    private customerService: CustomerService,
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
      isBlocked: new FormControl('Selecione uma opção'),
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
    fm.registerDate = fm.registerDate?.toLocaleString().split(',')[0] || null;
    const customer: Customer = { ...fm };
    this.customerService
      .getFilteredCustomer(
        customer,
        this.filterPagination.currentPage,
        this.filterPagination.itemsPerPage
      )
      .subscribe(
        (response: PaginatedResult<Customer[]>) => {
          this.listCustomerComponent.updateData(response.result);
          this.filterPagination = response.pagination;
          this.listCustomerComponent.pagination = response.pagination;
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
    if (field == 'isBlocked') {
      this.form.get(field)?.reset();
      this.blockTitle = 'Selecione uma opção';
    } else {
      this.form.get(field)?.reset();
    }
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
