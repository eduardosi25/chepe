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
  public query2:AvailabilityQuery2;
  public route:Route2;
  /** Segmentos para el viaje de ida */
  public segments:Segment[];
  /** Segmentos para el viaje de regreso */
  public segments2:Segment[];
  public rb:RouteBooking;
  public schedule:Schedule = null; //Último schedule obtenido (para mostrar costos)
  public preflight:Subscription = null; //Subscription to a prefligh
  public save(){
    //let x = JSON.stringify(this.query);
    //localStorage.setItem(SessionService.ls_query_key,x);
  }
  public mkUnifiedSegments():Segment[]{
    var s:Segment[] = [];
    for(var i=0;i<this.segments.length;i++){
      s.push(this.segments[i]);
    }
    if(this.query.round && this.segments2 != null){
      for(var i=0;i<this.segments2.length;i++){
        let s0:Segment = this.segments2[i];
        if(i == 0){
          s0.previous = s[s.length-1];
        }
        s0.n=this.segments.length+(i+1);
        s.push(s0);
      }
    }
    return s;
  }
}
