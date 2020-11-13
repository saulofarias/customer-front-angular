import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Customer} from 'src/app/view/customer/model/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  uri: string = 'http://localhost:8080/api/customers';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.uri);
  }

  getById(id): Observable<Customer> {
    return this.httpClient.get<Customer>(this.uri + '/' + id);
  }

  save(customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.uri, customer);
  }

  update(customer, id): Observable<any> {
    return this.httpClient.put<any>(this.uri + '/' + id, customer);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete<any>(this.uri + '/' + id);
  }
}
