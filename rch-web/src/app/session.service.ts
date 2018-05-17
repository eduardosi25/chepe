import { Injectable } from '@angular/core';
import { AvailabilityQuery } from './model/availabilityquery';
import { AvailabilityQuery2 } from './model/availabilityquery2';
import { Route2 } from './model/Route2';
import { Segment } from './model/segment';
import { RouteBooking } from './model/routebooking';
import { Schedule } from './model/schedule';
import { Subscription } from 'rxjs';

@Injectable()
export class SessionService {

  static ls_query_key:string = "_rch_query";
  constructor() {
  }
  public query:AvailabilityQuery2;
  public route:Route2;
  public segments:Segment[];
  public rb:RouteBooking;
  public schedule:Schedule = null; //Último schedule obtenido (para mostrar costos)
  public preflight:Subscription = null; //Subscription to a prefligh
  public save(){
    //let x = JSON.stringify(this.query);
    //localStorage.setItem(SessionService.ls_query_key,x);
  }
}
