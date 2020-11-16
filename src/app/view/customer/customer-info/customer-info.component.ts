import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { ViaCepService } from 'src/app/core/services/via-cep.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { EventDataService } from 'src/app/shared/services/event-data.service';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
})
export class CustomerInfoComponent implements OnInit {
  formCustomer: FormGroup;
  active = 1;
  zipCode: string;
  contacts: Array<string> = ['', ''];
  isUpload: boolean = false;

  customer: Customer = {
    customerAddress: {},
    contacts: [
      {
        type: 'fixo',
        number: '',
      },
      {
        type: 'movel',
        number: '',
      },
    ],
  };

  constructor(
    public eventDataService: EventDataService,
    private viaCepService: ViaCepService,
    private customerService: CustomerService,
    public toastService: ToastService,
    public formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let urlRoute = this.activateRoute.snapshot.url.filter((val) => {
      return val.toString().includes('info');
    });
    if (urlRoute.toString() === 'info') {
      this.createForm(this.customer);
      this.eventDataService.eventData.subscribe((event) => {
        this.getById(event);
        this.isUpload = true;
      });
    } else {
      this.createForm(new Customer());
      this.isUpload = false;
    }
  }

  createForm(customer: Customer) {
    this.zipCode = customer.customerAddress.zipCode;
    if (customer.contacts[0]) this.contacts.push(customer.contacts[0].number);
    else this.contacts.push('');
    if (customer.contacts[1]) this.contacts.push(customer.contacts[1].number);
    else this.contacts.push('');

    this.formCustomer = new FormGroup({
      cpf: new FormControl(customer.cpf),
      name: new FormControl(customer.name),
      email: new FormControl(customer.email),
      rg: new FormControl(customer.rg),
      street: new FormControl(customer.customerAddress.street),
      number: new FormControl(customer.customerAddress.number),
      district: new FormControl(customer.customerAddress.district),
      complement: new FormControl(customer.customerAddress.complement),
      city: new FormControl(customer.customerAddress.city),
      country: new FormControl(customer.customerAddress.country),
      state: new FormControl(customer.customerAddress.state),
      zipCode: new FormControl(this.zipCode),
      fixo: new FormControl(this.contacts[0]),
      movel: new FormControl(this.contacts[1]),
    });
  }

  onEnter(event) {
    if (event.keyCode === 13)
      this.viaCepService.getAddressByZipCode(this.zipCode).subscribe({
        next: (address) => {
          console.log('endereço ' + address);
          this.customer.customerAddress.country = 'Brasil';
          this.customer.customerAddress.street = address.logradouro;
          this.customer.customerAddress.district = address.bairro;
          this.customer.customerAddress.complement = address.complement;
          this.customer.customerAddress.state = address.uf;
          this.customer.customerAddress.city = address.localidade;
        },
        error: (err) => {
          console.log(err);
          this.toastService.error(err);
        },
      });
  }

  private getById(id) {
    this.customerService.getById(id).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.createForm(this.customer);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  save() {
    this.customer.customerAddress.zipCode = this.zipCode;
    if (this.isUpload) {
      this.customerService.update(this.customer, this.customer.cpf).subscribe({
        next: (response) => {
          this.isUpload = false;
          this.toastService.success('Registro atualizado com sucesso!');
        },
        error: (err) => {
          this.toastService.error(err.error.message);
        },
      });
      this.resetForm();
    } else {
      this.customerService.save(this.customer).subscribe({
        next: (customer) => {
          this.customer = customer;
          this.toastService.success('Registro salvo com sucesso!');
        },
        error: (err) => {
          console.log(err.error.message);
          this.toastService.error(err.error.message);
        },
      });
      this.resetForm();
    }
  }

  private resetForm() {
    this.customer = new Customer();
    this.createForm(new Customer());
    this.formCustomer.reset();
  }
}
