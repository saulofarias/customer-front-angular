import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventDataService {
  eventData = new BehaviorSubject<any>(false);
  constructor() {}

  setEvent(event: any) {
    this.eventData.next(event);
  }
}
