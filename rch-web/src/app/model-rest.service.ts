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
import { HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {FromJSONable} from "./model/FromJSONable";
import {environment} from "../environments/environment";
@Injectable()
export class ModelRestService implements IModel {

  constructor(private http:HttpClient) { }
  private base:string=environment.restws_base;
  private prefix:string="v1";
  stdCall<T>(url:string,method:string="get",data0=null,params0={},headers0=null,it:string=null):Observable<Response<T>>{
    let obs:Observable<Response<T>> = new Observable((observer)=>{
      var headers = {
        'X-Rch-At':'vXykLvyM7VmfGZLNYn3D'
      };
      if(headers0 != null){
        for(var i in headers0){
          let v = headers0[i];
          headers[i] = v;
        }
      }
      if(method == "get"){
        this.http.get<Response<T>>(url,{'headers':headers,'params':params0}).subscribe((data)=>{
          observer.next(data);
        },(error)=>{observer.error(error);});
      }else if(method == "post"){
        this.http.post<Response<T>>(url,data0,{'headers':headers}).subscribe((data)=>{
          observer.next(data);
        },(error)=>{observer.error(error);});
      }else if(method == "put"){
        this.http.put<Response<T>>(url,data0,{'headers':headers}).subscribe((data)=>{
          observer.next(data);
        },(error)=>{observer.error(error);});
      }
    });
    return obs;
  }
  getRoutes():Observable<Response<Route[]>>{
    return this.stdCall<Route[]>(this.base+"/"+this.prefix+"/routes");
  }
  createIntent(type:string):Observable<Response<Intent>>{
    return this.stdCall<Intent>(this.base+"/"+this.prefix+"/intent/"+type,"post");
  }
  createSession():Observable<Response<SessionToken>>{
    return this.stdCall<Intent>(this.base+"/"+this.prefix+"/session","post",null,{},null,"create-session");
  }
  getStatus():Observable<Response<boolean>>{
    return this.stdCall<boolean>(this.base+"/"+this.prefix+"/status");
  }
  getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Observable<Response<Schedule>>{
    return this.stdCall<Schedule>(this.base+"/"+this.prefix+"/routes/"+id+"/schedule/available","get",null,query);
  }
  saveRouteBooking(b:RouteBooking):Observable<Response<RouteBooking>>{
    return this.stdCall<RouteBooking>(this.base+"/"+this.prefix+"/routes/booking","post",b,{},null,"put-booking");
  }
  getTravel(id:number):Observable<Response<Travel>>{
    return this.stdCall<Travel>(this.base+"/"+this.prefix+"/travel/"+id);
  }

}
