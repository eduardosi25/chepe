import { Seat } from "./seat";
import { Travel } from "./travel";
import { Person } from "./person";
import { SeatBooking } from "./seatbooking";

export class RouteBooking{
    id:number;
    status:number=1;
    seats:SeatBooking[];
    persons:Person[];
    etickets_email:string;
    etickets_phone:string;
    travels:Travel[];
}