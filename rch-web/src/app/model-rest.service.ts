import { Injectable } from '@angular/core';
import { IModel } from './model/imodel';
import { Route2 } from './model/route2';
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
import { UrlWebPay } from './model/url';
import { WebPay } from './model/webpay';
import { Country } from './model/country';
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
  getRoutes():Observable<Response<Route2[]>>{
    return this.stdCall<Route2[]>(Route2,this.base+"/"+this.prefix+"/routes","get",null,{},null,null,true);
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
    return this.stdCall<Schedule>(Schedule,this.base+"/"+this.prefix+"/routes/"+id+"/schedule/available","get",null,query.getForParams());
  }
  saveRouteBooking(b:RouteBooking):Observable<Response<RouteBooking>>{
    return this.stdCall<RouteBooking>(RouteBooking,this.base+"/"+this.prefix+"/routes/booking","post",b,{},null,"put-booking");
  }
  getWebPayUrl(b:RouteBooking):Observable<Response<WebPay>>{
    return this.stdCall<WebPay>(WebPay,this.base+"/"+this.prefix+"/routes/booking","post",b,{},null,"put-booking");
  }
  getTravel(id:number,id_src:number,id_dst:number):Observable<Response<Travel>>{
    return this.stdCall<Travel>(Travel,this.base+"/"+this.prefix+"/travel/"+id,"get",null,{
      'src':id_src,
      'dst':id_dst
    });
  }
  getCountries():Observable<Response<Country[]>>{
    return this.stdCall<Country[]>(Country,this.base+"/"+this.prefix+"/countries","get",null,{},null,null,true);
  }
  // getPaymentUrl(amount:number,mail:string):Observable<Response<UrlWebPay>>{
  //   return this.stdCall<UrlWebPay>(UrlWebPay,this.base+"/"+this.prefix+"/payment/url","get",null,{
  //     'amount':amount,
  //     'mail':mail
  //   });
  // }
}
