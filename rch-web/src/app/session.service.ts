import { Injectable } from '@angular/core';
import { AvailabilityQuery } from './model/availabilityquery';
import { AvailabilityQuery2 } from './model/availabilityquery2';
import { Route } from './model/Route';

@Injectable()
export class SessionService {

  static ls_query_key:string = "_rch_query";
  constructor() {
  }
  public query:AvailabilityQuery2;
  public route:Route;
  public save(){
    let x = JSON.stringify(this.query);
    localStorage.setItem(SessionService.ls_query_key,x);
  }
}
