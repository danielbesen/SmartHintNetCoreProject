import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { take } from 'rxjs/operators';

@Injectable()
export class CustomerService {
  baseUrl = 'https://localhost:7125/api/customer';

  constructor(private http: HttpClient) {}

  public getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl).pipe(take(1));
  }

  public getFilteredCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/filter`).pipe(take(1));
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
