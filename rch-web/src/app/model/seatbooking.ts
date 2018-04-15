import { Seat } from "./seat";
import { Wagon } from "./wagon";
import { Travel } from "./travel";
import { PassengerType } from "./passengertype";
import { Cost } from "./cost";
import { Route } from "./route";
import { FromJSONable } from "./FromJSONable";

export class SeatBooking implements FromJSONable{
    constructor(seat:Seat=new Seat(),wagon:Wagon=new Wagon(),travel:Travel=new Travel(),route:Route=new Route(),pt:PassengerType=new PassengerType(),cost:Cost=new Cost()){
        this.seat = seat;
        this.wagon = wagon;
        this.travel = travel;
        this.route = route;
        this.passenger_type = pt;
        this.cost = cost;
    }
    parseJSONObject(object:Object){
        if(!object){return;}
        Object.assign(this,object);
        this.seat = new Seat(); this.seat.parseJSONObject(object["seat"]);
        this.wagon = new Wagon(); this.wagon.parseJSONObject(object["wagon"]);
        this.travel = new Travel(); this.travel.parseJSONObject(object["travel"]);
        this.route = new Route(); this.route.parseJSONObject(object["route"]);
        this.cost = new Cost(); this.cost.parseJSONObject(object["cost"]);
        this.passenger_type = new PassengerType(); this.passenger_type.parseJSONObject(object["passenger_type"]);
    }
    seat:Seat = new Seat();
    wagon:Wagon = new Wagon();
    travel:Travel = new Travel();
    route:Route = new Route();
    cost:Cost = new Cost();
    passenger_type:PassengerType = new PassengerType();
}