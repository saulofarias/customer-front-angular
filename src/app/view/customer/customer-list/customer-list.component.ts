import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { EventDataService } from 'src/app/shared/services/event-data.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Array<Customer> = [];
  constructor(
    private customerService: CustomerService,
    public toastService: ToastService,
    private router: Router,
    public eventDataService: EventDataService
  ) {
    this.getAll();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.customerService.getAll().subscribe({
      next: (customers) => {
        if (customers) this.customers = customers;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getById(id) {
    localStorage.setItem('customerId', id);
    this.eventDataService.setEvent(id);
    this.router.navigate(['clientes/info']);
  }

  deleteById(cpf) {
    this.customerService.delete(cpf).subscribe({
      next: (response) => {
        this.ngOnInit();
        this.toastService.success('Registro excluído com sucesso!');
      },
      error: (err) => {
        console.log(err);
        this.toastService.error('Erro ao realizar procedimento!');
      },
    });
  }
}
