import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
})
export class ListCustomerComponent implements OnInit {
  public customers: Customer[] = [];
  public filteredCustomers: Customer[];
  private customerId: number;
  selectedRows: number[] = [];
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private dataService: DataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  public updateData(data: Customer[]): void {
    console.log(data);
    this.filteredCustomers = data;
  }

  public getCustomers(): void {
    this.customerService.getCustomer().subscribe(
      (_customers: Customer[]) => {
        this.customers = _customers;
        this.filteredCustomers = _customers;
      },
      (error) => console.log(error)
    );
  }

  detailCustomer(id: number): void {
    this.router.navigate([`customer/detail/${id}`]);
  }

  selectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedRows = Array.from(
        { length: this.customers.length },
        (_, i) => i
      );
    } else {
      // Deselect all rows
      this.selectedRows = [];
    }
  }

  toggleRow(index: number): void {
    if (this.selectedRows.includes(index)) {
      // Row is selected, deselect it
      this.selectedRows = this.selectedRows.filter(
        (rowIndex) => rowIndex !== index
      );
    } else {
      this.selectedRows.push(index);
    }
  }

  isRowSelected(index: number): boolean {
    return this.selectedRows.includes(index);
  }

  updateSelectAll(): void {
    const allSelected = this.selectedRows.length === this.customers.length;
    const selectAllCheckbox = document.querySelector(
      '#selectAll'
    ) as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = allSelected;
    }
  }

  updateBlockedCheckbox(customer: Customer): void {
    customer.isBlocked = !customer.isBlocked;
    this.customerService.put(customer).subscribe(
      // () => this.toastr.success('Customer saved!', 'Success'),
      () => {},
      (error: any) => {
        console.error(error);
        // this.toastr.error('Something wrong!');
      },
      () => {}
    );
  }
}
