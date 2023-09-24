import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination';

@Injectable()
export class CustomerService {
  baseUrl = 'https://localhost:7125/api/customer';

  constructor(private http: HttpClient) {}

  public getCustomer(
    page?: number,
    itemsPerPage?: number
  ): Observable<PaginatedResult<Customer[]>> {
    const paginatedResult: PaginatedResult<Customer[]> = new PaginatedResult<
      Customer[]
    >();

    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('PageNumber', page.toString());
      params = params.append('PageSize', itemsPerPage.toString());
    }

    return this.http
      .get<Customer[]>(this.baseUrl, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  public getFilteredCustomer(
    customer: Customer,
    page?: number,
    itemsPerPage?: number
  ): Observable<PaginatedResult<Customer[]>> {
    const paginatedResult: PaginatedResult<Customer[]> = new PaginatedResult<
      Customer[]
    >();

    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page?.toString());
      params = params.append('pageSize', itemsPerPage?.toString());
      params = params.append('name', customer.name);
      params = params.append('email', customer.email);
      params = params.append('phone', customer.phone);
      params = params.append(
        'registerDate',
        customer.registerDate !== null ? customer.registerDate.toString() : null
      );
      params = params.append(
        'isBlocked',
        customer.isBlocked !== null ? customer.isBlocked.toString() : null
      );
    }

    return this.http
      .get<Customer[]>(`${this.baseUrl}/filter`, {
        observe: 'response',
        params,
      })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  public getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  public post(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}`, customer).pipe(take(1));
  }

  public put(customer: Customer): Observable<Customer> {
    return this.http
      .put<Customer>(`${this.baseUrl}/${customer.id}`, customer)
      .pipe(take(1));
  }

  public deleteCustomer(id: number): Observable<string> {
    return this.http
      .delete(`${this.baseUrl}/${id}`, { responseType: 'text' })
      .pipe(take(1));
  }
}
