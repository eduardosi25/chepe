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


@Injectable()
export class ModelService implements IModel {

  private impl:IModel;

  constructor(private model_dummy:ModelDummyService) { 
    this.impl = model_dummy;
  }

  private train_stops={};
  getRoutes():Response<Route[]>{
    let response:Response<Route[]> = this.impl.getRoutes();
    for(var i=0;i<response.data.length;i++){
      let route:Route = response.data[i];
      for(var j=0;j<route.stops.length;j++){
        let ts:TrainStop = route.stops[j];
        this.train_stops[ts.id] = ts;
      }
    }
    return response;
  }
  createIntent(type:string):Response<Intent>{
    return this.impl.createIntent(type);
  }
  createSession():Response<SessionToken>{
    return this.impl.createSession();
  }
  getStatus():Response<boolean>{
    return this.impl.getStatus();
  }
  getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Response<Schedule>{
    return this.impl.getRouteScheduleAvailable(id,query);
  }
  saveRouteBooking(b:RouteBooking):Response<RouteBooking>{
    return this.impl.saveRouteBooking(b);
  }
  getTravel(id:number):Response<Travel>{
    return this.impl.getTravel(id);
  }
  public getRouteByName(route_name:string):Route{
    let routes:Route[] = this.getRoutes().data;
    for(var i=0;i<routes.length;i++){
      let route = routes[i];
      if(route.name == route_name){
        return route;
      }
    }
    return null;
  }
  public getTrainStopById(id:number):TrainStop{
    let ts:TrainStop = this.train_stops[id];
    return ts;
  }

}
