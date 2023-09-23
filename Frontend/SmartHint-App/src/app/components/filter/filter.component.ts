import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public blockTitle: string = 'Selecione uma opção';
  form: FormGroup;
  @Input() customers: Customer[] = [];
  isCollapsed = true;
  constructor(
    private localeService: BsLocaleService,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      registerDate: [''],
      isBlocked: [''],
    });
  }

  public applyFilter(): void {
    let fm = this.form.value;

    fm.isBlocked =
      fm.isBlocked === 'Sim' ? true : fm.isBlocked === 'Não' ? false : null;

    fm.registerDate = fm.registerDate || null;
    const customer: Customer = { ...this.form.value };
    this.customerService.getFilteredCustomer(customer).subscribe(
      (_customers: Customer[]) => {
        this.customers = _customers;
      },
      (error) => console.error(error)
    );
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
