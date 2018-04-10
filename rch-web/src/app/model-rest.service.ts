import { Injectable } from '@angular/core';
import { IModel } from './model/imodel';
import { Route } from './model/route';
import { Intent } from './model/intent';
import { SessionToken } from './model/sessiontoken';
import { Schedule } from './model/schedule';
import { RouteBooking } from './model/routebooking';
import { Travel } from './model/travel';
import { Response } from './model/response';
import { AvailabilityQuery } from './model/availabilityquery';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/Rx";
@Injectable()
export class ModelRestService implements IModel {

  constructor(private http:HttpClient) { }
  private base:string="http://localhost:4200";
  private prefix:string="v1";
  getRoutes():Observable<Response<Route[]>>{
    this.http.get(this.base+"/"+this.prefix+"/routes");
    return null;
  }
  createIntent(type:string):Observable<Response<Intent>>{
    return null;
  }
  createSession():Observable<Response<SessionToken>>{
    return null;
  }
  getStatus():Observable<Response<boolean>>{
    return null;
  }
  getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Observable<Response<Schedule>>{
    return null;
  }
  saveRouteBooking(b:RouteBooking):Observable<Response<RouteBooking>>{
    return null;
  }
  getTravel(id:number):Observable<Response<Travel>>{
    return null;
  }

}
