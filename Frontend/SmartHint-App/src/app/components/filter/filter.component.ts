import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public customers: Customer[] = [];
  public blockTitle: string = 'Selecione uma opção';
  isCollapsed = true;
  constructor(
    private localeService: BsLocaleService,
    private customerService: CustomerService
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {}

  public applyFilter(customer: Customer): void {
    this.customerService.getFilteredCustomer(customer).subscribe(
      (_customers: Customer[]) => {
        this.customers = _customers;
      },
      (error) => console.log(error)
    );
  }

  public changeBlockTitle(value: string): void {
    this.blockTitle = value;
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }
}
