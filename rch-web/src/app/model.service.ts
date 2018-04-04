import { Injectable } from '@angular/core';
import {ModelDummyService} from './model-dummy.service';
import {ModelRestService} from './model-rest.service';
import { IModel } from './model/imodel';
import { Route } from './model/Route';
import { Intent } from './model/intent';
import { SessionToken } from './model/sessiontoken';
import { Schedule } from './model/schedule';
import { RouteBooking } from './model/routebooking';
import { Travel } from './model/travel';
import { Response } from './model/response';


@Injectable()
export class ModelService implements IModel {

  private impl:IModel;

  constructor(private model_dummy:ModelDummyService) { 
    this.impl = model_dummy;
  }

  getRoutes():Response<Route[]>{
    return this.impl.getRoutes();
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
  getRouteScheduleAvailable(id:number):Response<Schedule>{
    return this.impl.getRouteScheduleAvailable(id);
  }
  saveRouteBooking(b:RouteBooking):Response<RouteBooking>{
    return this.impl.saveRouteBooking(b);
  }
  getTravel(id:number):Response<Travel>{
    return this.impl.getTravel(id);
  }

}
