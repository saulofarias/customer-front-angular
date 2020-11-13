import { Address } from './address';
import { Contacts } from './contacts';

export class Customer {
  cpf?: string;
  rg?: string;
  email?: string;
  name?: string;
  customerAddress?: Address = new Address();
  contacts?: Array<Contacts> = [];
}
