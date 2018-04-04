import { Seat } from "./seat";
import { Wagon } from "./wagon";
import { Travel } from "./travel";
import { Route } from "@angular/compiler/src/core";
import { PassengerType } from "./passengertype";
import { Cost } from "./cost";

export class SeatBooking{
    seat:Seat;
    wagon:Wagon;
    travel:Travel;
    route:Route;
    cost:Cost;
    passenger_type:PassengerType;
}