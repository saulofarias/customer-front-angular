import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { ViaCepService } from 'src/app/core/services/via-cep.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { EventDataService } from 'src/app/shared/services/event-data.service';
import { Contacts } from '../model/contacts';
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
  contacts: Array<Contacts> = [];
  isUpload: boolean = false;

  customer: Customer = {
    customerAddress: {},
    contacts: [
      {
        type: 'telefone',
        number: '',
      },
      {
        type: 'celular',
        number: '',
      },
    ],
  };

  constructor(
    public eventDataService: EventDataService,
    private viaCepService: ViaCepService,
    private customerService: CustomerService,
    public toastService: ToastService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm(this.customer);

    this.eventDataService.eventData.subscribe((event) => {
      this.getById(event);
    });
  }

  createForm(customer: Customer) {
    this.zipCode = customer.customerAddress.zipCode;
    this.formCustomer = this.formBuilder.group({
      cpf: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      rg: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      district: ['', Validators.required],
      complement: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      fixo: [''],
      movel: [''],
    });
  }

  onEnter(event) {
    if (event.keyCode === 13)
      this.viaCepService.getAddressByZipCode(this.zipCode).subscribe({
        next: (address) => {
          console.log(address);
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
        this.isUpload = true;
        this.customer = customer;
        this.createForm(customer);
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
      this.formCustomer.reset();
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
      this.formCustomer.reset();
    }
  }
}
