import { Seat } from "./seat";
import { Wagon } from "./wagon";
import { Travel } from "./travel";
import { PassengerType } from "./passengertype";
import { Cost } from "./cost";
import { Route } from "./Route";

export class SeatBooking{
    constructor(seat:Seat,wagon:Wagon,travel:Travel,route:Route,pt:PassengerType,cost:Cost=null){
        this.seat = seat;
        this.wagon = wagon;
        this.travel = travel;
        this.route = route;
        this.passenger_type = pt;
        this.cost = cost;
    }
    seat:Seat;
    wagon:Wagon;
    travel:Travel;
    route:Route;
    cost:Cost;
    passenger_type:PassengerType;
}