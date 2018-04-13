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
  stdCall<T>(cl:{new()},url:string,method:string="get",data0=null,params0={},headers0=null,it:string=null,clarr:boolean = false):Observable<Response<T>>{
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
          observer.next(this.assign(data,cl,clarr));
        },(error)=>{observer.error(error);});
      }else if(method == "post"){
        this.http.post<Response<T>>(url,data0,{'headers':headers}).subscribe((data)=>{
          observer.next(this.assign(data,cl,clarr));
        },(error)=>{observer.error(error);});
      }else if(method == "put"){
        this.http.put<Response<T>>(url,data0,{'headers':headers}).subscribe((data)=>{
          observer.next(this.assign(data,cl,clarr));
        },(error)=>{observer.error(error);});
      }
    });
    return obs;
  }
  assign<T>(data,cl:{new()}=null,clarry:boolean):Response<T>{
    var r:Response<T> = new Response<T>(null,null,clarry?[]:new cl());
    if(clarry){
      r.parseJSONObject2(data,cl);
    }else{
      r.parseJSONObject(data);
    }
    return r;
  }
  getRoutes():Observable<Response<Route[]>>{
    return this.stdCall<Route[]>(Route,this.base+"/"+this.prefix+"/routes","get",null,{},null,null,true);
  }
  createIntent(type:string):Observable<Response<Intent>>{
    return this.stdCall<Intent>(Intent,this.base+"/"+this.prefix+"/intent/"+type,"post");
  }
  createSession():Observable<Response<SessionToken>>{
    return this.stdCall<SessionToken>(SessionToken,this.base+"/"+this.prefix+"/session","post",null,{},null,"create-session");
  }
  getStatus():Observable<Response<boolean>>{
    return this.stdCall<boolean>(Boolean,this.base+"/"+this.prefix+"/status");
  }
  getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Observable<Response<Schedule>>{
    return this.stdCall<Schedule>(Schedule,this.base+"/"+this.prefix+"/routes/"+id+"/schedule/available","get",null,{
      'passengers':query.passengers,
      'src':query.id_src,
      'dst':query.id_dst,
      'start':query.start,
      'end':query.end,
      'stops':JSON.stringify(query.stops)
    });
  }
  saveRouteBooking(b:RouteBooking):Observable<Response<RouteBooking>>{
    return this.stdCall<RouteBooking>(RouteBooking,this.base+"/"+this.prefix+"/routes/booking","post",b,{},null,"put-booking");
  }
  getTravel(id:number):Observable<Response<Travel>>{
    return this.stdCall<Travel>(Travel,this.base+"/"+this.prefix+"/travel/"+id);
  }

}
