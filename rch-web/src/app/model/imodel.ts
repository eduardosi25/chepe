import { Route } from "./Route";
import { Intent } from "./intent";
import { SessionToken } from "./sessiontoken";
import { Schedule } from "./schedule";
import { RouteBooking } from "./routebooking";
import { Travel } from "./travel";
import { Response } from "./response";
import { AvailabilityQuery } from "./availabilityquery";

export interface IModel{
    getRoutes():Response<Route[]>;
    createIntent(type:string):Response<Intent>;
    createSession():Response<SessionToken>;
    getStatus():Response<boolean>;
    getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Response<Schedule>;
    saveRouteBooking(b:RouteBooking):Response<RouteBooking>;
    getTravel(id:number):Response<Travel>;
}