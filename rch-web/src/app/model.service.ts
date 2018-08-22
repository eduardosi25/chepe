import { Injectable } from '@angular/core';
import {ModelDummyService} from './model-dummy.service';
import {ModelRestService} from './model-rest.service';
import { IModel } from './model/imodel';
import { Route2 } from './model/route2';
import { Intent } from './model/intent';
import { SessionToken } from './model/sessiontoken';
import { Schedule } from './model/schedule';
import { RouteBooking } from './model/routebooking';
import { Travel } from './model/travel';
import { Response } from './model/response';
import { AvailabilityQuery } from './model/availabilityquery';
import { TrainStop } from './model/trainstop';
import {Observable} from 'rxjs/Rx';
import {environment} from "../environments/environment";
import { ModelDummyRestService } from './model-dummy-rest.service';
import { PassengerType } from './model/passengertype';
import { Wagon } from './model/wagon';
import { WagonType } from './model/wagontype';
import { Url } from 'url';
import { WebPay } from './model/webpay';
import { Country } from './model/country';

@Injectable()
export class ModelService implements IModel {

  private impl:IModel;

  constructor(private model_dummy:ModelDummyService,
    private model_rest:ModelRestService,
    private model_dummy_rest:ModelDummyRestService) { 
    if(environment.model == "dummy"){
      this.impl = model_dummy;
    }else if(environment.model == "dummy-rest"){
      this.impl = model_dummy_rest;
    }else{
      this.impl = model_rest;
    }
  }

  private train_stops={};
  private route_by_name={};
  private passenger_types_by_id=[];
  private wagon_types_by_id={};
  getRoutes():Observable<Response<Route2[]>>{
    let a = this.impl.getRoutes();
    a.subscribe((response:Response<Route2[]>)=>{
      for(var i=0;i<response.data.length;i++){
        let route:Route2 = response.data[i];
        this.route_by_name[route.name]=route;
        for(var j=0;j<route.stops.length;j++){
          let ts:TrainStop = route.stops[j];
          this.train_stops[ts.id] = ts;
        }
        let pts:PassengerType[] = route.passenger_types;
        for(var j=0;j<pts.length;j++){
          let pt:PassengerType = pts[j];
          this.passenger_types_by_id[pt.id] = pt;
        }
        let ws:Wagon[] = route.wagons;
        for(var j=0;j<ws.length;j++){
          let w:Wagon = ws[j];
          let wt:WagonType = w.type;
          this.wagon_types_by_id[""+wt.id] = wt;
        }
      }
    });
    return a;
  }
  createIntent(type:string):Observable<Response<Intent>>{
    return this.impl.createIntent(type);
  }
  createSession():Observable<Response<SessionToken>>{
    return this.impl.createSession();
  }
  getStatus():Observable<Response<boolean>>{
    return this.impl.getStatus();
  }
  getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Observable<Response<Schedule>>{
    return this.impl.getRouteScheduleAvailable(id,query);
  }
  saveRouteBooking(b:RouteBooking):Observable<Response<RouteBooking>>{
    return this.impl.saveRouteBooking(b);
  }
  getWebPayUrl(b:RouteBooking):Observable<Response<WebPay>>{
    return this.impl.getWebPayUrl(b);
  }
  getTravel(id:number,id_src:number,id_dst:number):Observable<Response<Travel>>{
    return this.impl.getTravel(id,id_src,id_dst);
  }
  // getPaymentUrl(amount:number,mail:string):Observable<Response<UrlWebPay>>{
  //   return this.impl.getPaymentUrl(amount,mail);
  // }
  public getRouteByName(route_name:string):Route2{
    return this.route_by_name[route_name];
  }
  public getTrainStopById(id:number):TrainStop{    
    console.log("ts0byid");
    console.log(id);
    let ts:TrainStop = this.train_stops[id];
    return ts;
  }
  public getPassengerTypeById(id:number):PassengerType{
    if(this.passenger_types_by_id.length>id){
      return this.passenger_types_by_id[id];
    }
    return null;
  }
  public getWagonTypeById(id:number):WagonType{
    console.log(this.wagon_types_by_id);
    return this.wagon_types_by_id[""+id];
  }
  getCountries():Observable<Response<Country[]>>{
    return this.impl.getCountries();
  }
}
