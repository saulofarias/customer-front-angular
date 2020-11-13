import { TestBed } from '@angular/core/testing';

import { DataCustomerService } from './data-customer.service';

describe('DataCustomerService', () => {
  let service: DataCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
