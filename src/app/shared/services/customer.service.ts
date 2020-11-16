import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/view/customer/model/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  uri: string = environment.URL;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.uri}customers`);
  }

  getById(id): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.uri}customers/${id}`);
  }

  save(customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.uri}customers`, customer);
  }

  update(customer, id): Observable<any> {
    return this.httpClient.put<any>(`${this.uri}customers/${id}`, customer);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete<any>(`${this.uri}customers/${id}`);
  }
}
