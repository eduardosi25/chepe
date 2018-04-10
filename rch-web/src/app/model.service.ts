import { Injectable } from '@angular/core';
import {ModelDummyService} from './model-dummy.service';
import {ModelRestService} from './model-rest.service';
import { IModel } from './model/imodel';
import { Route } from './model/route';
import { Intent } from './model/intent';
import { SessionToken } from './model/sessiontoken';
import { Schedule } from './model/schedule';
import { RouteBooking } from './model/routebooking';
import { Travel } from './model/travel';
import { Response } from './model/response';
import { AvailabilityQuery } from './model/availabilityquery';
import { TrainStop } from './model/trainstop';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ModelService implements IModel {

  private impl:IModel;

  constructor(private model_dummy:ModelDummyService) { 
    this.impl = model_dummy;
  }

  private train_stops={};
  private route_by_name={};
  getRoutes():Observable<Response<Route[]>>{
    let a = this.impl.getRoutes();
    a.subscribe((response:Response<Route[]>)=>{
      for(var i=0;i<response.data.length;i++){
        let route:Route = response.data[i];
        this.route_by_name[route.name]=route;
        for(var j=0;j<route.stops.length;j++){
          let ts:TrainStop = route.stops[j];
          this.train_stops[ts.id] = ts;
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
  getTravel(id:number):Observable<Response<Travel>>{
    return this.impl.getTravel(id);
  }
  public getRouteByName(route_name:string):Route{
    return this.route_by_name[route_name];
  }
  public getTrainStopById(id:number):TrainStop{
    let ts:TrainStop = this.train_stops[id];
    return ts;
  }

}
