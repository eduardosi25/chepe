import { Injectable } from '@angular/core';
import { IModel } from './model/imodel';
import { ModelDummyService } from './model-dummy.service';
import {Observable} from 'rxjs/Rx';
import { Response } from './model/response';
import { Route } from './model/route';
import { Intent } from './model/intent';
import { SessionToken } from './model/sessiontoken';
import { AvailabilityQuery } from './model/availabilityquery';
import { Schedule } from './model/schedule';
import { RouteBooking } from './model/routebooking';
import { Travel } from './model/travel';
@Injectable()
export class ModelDummyRestService implements IModel{
  
  getRoutes(): Observable<Response<Route[]>> {
    return new Observable<Response<Route[]>>((observer)=>{
      this.dummies.getRoutes().subscribe((data)=>{
        let x = JSON.parse(JSON.stringify(data));
        var r:Response<Route[]> = new Response<Route[]>(null,null,[]);
        r.parseJSONObject2(x,Route);
        /*r.data = [];let y:Object[] = x["data"];
        for(var i=0;i<y.length;i++){
          let yy:Object = y[i];
          var xx:Route = new Route();xx.parseJSONObject(yy);
          r.data.push(xx);
        }*/
        console.log(x,r);
        observer.next(r);
      });
    });
  }
  createIntent(type: string): Observable<Response<Intent>> {
    return new Observable<Response<Intent>>((observer)=>{
      this.dummies.createIntent(type).subscribe((data)=>{
        let x = JSON.parse(JSON.stringify(data));
        var r:Response<Intent> = new Response<Intent>(null,null, new Intent());
        r.parseJSONObject(x);
        observer.next(r);
      });
    });
  }
  createSession(): Observable<Response<SessionToken>> {
    return new Observable<Response<SessionToken>>((observer)=>{
      this.dummies.createSession().subscribe((data)=>{
        let x = JSON.parse(JSON.stringify(data));
        var r:Response<SessionToken> = new Response<SessionToken>(null,null,new SessionToken());
        r.parseJSONObject(x);
        observer.next(r);
      });
    });
  }
  getStatus(): Observable<Response<boolean>> {
    return new Observable<Response<boolean>>((observer)=>{
      this.dummies.getStatus().subscribe((data)=>{
        let x = JSON.parse(JSON.stringify(data));
        var r:Response<boolean> = new Response<boolean>(null,null,false);
        r.parseJSONObject(x);
        observer.next(r);
      });
    });
  }
  getRouteScheduleAvailable(id: number, query: AvailabilityQuery): Observable<Response<Schedule>> {
    return new Observable<Response<Schedule>>((observer)=>{
      this.dummies.getRouteScheduleAvailable(id,query).subscribe((data)=>{
        let x = JSON.parse(JSON.stringify(data));
        var r:Response<Schedule> = new Response<Schedule>(null,null,new Schedule());
        r.parseJSONObject(x);
        observer.next(r);
      });
    });
  }
  saveRouteBooking(b: RouteBooking): Observable<Response<RouteBooking>> {
    return new Observable<Response<RouteBooking>>((observer)=>{
      this.dummies.saveRouteBooking(b).subscribe((data)=>{
        let x = JSON.parse(JSON.stringify(data));
        var r:Response<RouteBooking> = new Response<RouteBooking>(null,null,new RouteBooking());
        r.parseJSONObject(x);
        observer.next(r);
      });
    });
  }
  getTravel(id: number): Observable<Response<Travel>> {
    return new Observable<Response<Travel>>((observer)=>{
      this.dummies.getTravel(id).subscribe((data)=>{
        let x = JSON.parse(JSON.stringify(data));
        var r:Response<Travel> = new Response<Travel>(null,null,new Travel());
        r.parseJSONObject(x);
        observer.next(r);
      });
    });
  }
  constructor(private dummies:ModelDummyService) { }

}
