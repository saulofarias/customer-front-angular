import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  uri: string = 'https://viacep.com.br/ws/';
  resource: string = '/json/';
  constructor(private httpClient: HttpClient) {}

  getAddressByZipCode(zipCode): Observable<any> {
    return this.httpClient.get<any>(this.uri + zipCode + this.resource);
  }
}
