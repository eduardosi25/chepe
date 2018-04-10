import { Route } from "./Route";
import { Intent } from "./intent";
import { SessionToken } from "./sessiontoken";
import { Schedule } from "./schedule";
import { RouteBooking } from "./routebooking";
import { Travel } from "./travel";
import { Response } from "./response";
import { AvailabilityQuery } from "./availabilityquery";
import {Observable} from "rxjs/Rx";

export interface IModel{
    getRoutes():Observable<Response<Route[]> >;
    createIntent(type:string):Observable<Response<Intent> >;
    createSession():Observable<Response<SessionToken> >;
    getStatus():Observable<Response<boolean> >;
    getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Observable<Response<Schedule> >;
    saveRouteBooking(b:RouteBooking):Observable<Response<RouteBooking> >;
    getTravel(id:number):Observable<Response<Travel> >;
}