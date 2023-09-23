import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
})
export class ListCustomerComponent implements OnInit {
  public customers: Customer[] = [];
  public filteredCustomers: Customer[] = [];
  private _listFilter: string = '';
  private customerId: number;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  public getCustomers(): void {
    this.customerService.getCustomer().subscribe(
      (_customers: Customer[]) => {
        this.customers = _customers;
      },
      (error) => console.log(error)
    );
  }

  detailCustomer(id: number): void {
    this.router.navigate([`customer/detail/${id}`]);
  }
}
