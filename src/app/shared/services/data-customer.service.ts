import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataCustomerService {
  localEvent = new EventEmitter<any>();
  constructor() {}

  setEvent(event: any) {
    this.localEvent.emit(event);
  }
}
