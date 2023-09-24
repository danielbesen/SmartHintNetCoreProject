import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';
import { PaginatedResult, Pagination } from 'src/app/models/pagination';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FilterComponent } from '../../filter/filter.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss'],
})
export class ListCustomerComponent implements OnInit {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;

  public customers: Customer[] = [];
  public filteredCustomers: Customer[];
  private customerId: number;
  selectedRows: number[] = [];
  public pagination: Pagination;
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 20,
      totalItems: 1,
    } as Pagination;
    this.getCustomers();
  }

  public updateData(data: Customer[]): void {
    this.filteredCustomers = data;
  }

  public getCustomers(): void {
    this.customerService
      .getCustomer(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (response: PaginatedResult<Customer[]>) => {
          this.customers = response.result;
          this.filteredCustomers = response.result;
          this.pagination = response.pagination;
          this.dataService.sharedData = this.pagination;
        },
        (error) => console.log(error)
      );
  }

  detailCustomer(id: number): void {
    this.router.navigate([`customers/detail/${id}`]);
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

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    if (this.filterComponent.isFiltering) {
      this.filterComponent.applyFilter();
    } else {
      this.getCustomers();
    }
  }
}
