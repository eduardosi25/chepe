import { Route2 } from "./route2";
import { Intent } from "./intent";
import { SessionToken } from "./sessiontoken";
import { Schedule } from "./schedule";
import { RouteBooking } from "./routebooking";
import { Travel } from "./travel";
import { Response } from "./response";
import { AvailabilityQuery } from "./availabilityquery";
import {Observable} from "rxjs/Rx";

export interface IModel{
    getRoutes():Observable<Response<Route2[]> >;
    createIntent(type:string):Observable<Response<Intent> >;
    createSession():Observable<Response<SessionToken> >;
    getStatus():Observable<Response<boolean> >;
    getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Observable<Response<Schedule> >;
    saveRouteBooking(b:RouteBooking):Observable<Response<RouteBooking> >;
    getTravel(id:number,id_src:number,id_dst:number):Observable<Response<Travel> >;
}