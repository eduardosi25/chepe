import { Injectable } from '@angular/core';
import { AvailabilityQuery } from './model/availabilityquery';
import { AvailabilityQuery2 } from './model/availabilityquery2';

@Injectable()
export class SessionService {

  constructor() { }
  public query:AvailabilityQuery2;
}
