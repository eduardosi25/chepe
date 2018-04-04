import { Injectable } from '@angular/core';
import { IModel } from './model/imodel';
import { Route } from './model/Route';
import { Intent } from './model/intent';
import { SessionToken } from './model/sessiontoken';
import { Schedule } from './model/schedule';
import { RouteBooking } from './model/routebooking';
import { Travel } from './model/travel';
import { Response } from './model/response';

@Injectable()
export class ModelDummyService implements IModel {

  constructor() { }

  getRoutes():Response<Route>{
    return null;
  }
  createIntent(type:string):Response<Intent>{
    return null;
  }
  createSession():Response<SessionToken>{
    return null;
  }
  getStatus():Response<boolean>{
    return null;
  }
  getRouteScheduleAvailable(id:number):Response<Schedule>{
    return null;
  }
  saveRouteBooking(b:RouteBooking):Response<RouteBooking>{
    return null;
  }
  getTravel(id:number):Response<Travel>{
    return null;
  }
}
