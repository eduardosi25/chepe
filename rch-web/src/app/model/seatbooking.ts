import { Seat } from "./seat";
import { Wagon } from "./wagon";
import { Travel } from "./travel";
import { PassengerType } from "./passengertype";
import { Cost } from "./cost";
import { FromJSONable } from "./FromJSONable";
import { Route2 } from "./route2";
import { stat } from "fs";

export class SeatBooking implements FromJSONable{
    constructor(seat:Seat=new Seat(),wagon:Wagon=new Wagon(),travel:Travel=new Travel(),route:Route2=new Route2(),pt:PassengerType=new PassengerType(),cost:Cost=new Cost(),id_person:number, stats:number){
        this.seat = seat;
        this.wagon = wagon;
        this.travel = travel;
        this.route = route;
        this.passenger_type = pt;
        this.cost = cost;
        this.id_person = id_person;
        this.status = stats;
    }
    parseJSONObject(object:Object){
        if(!object){return;}
        console.log(object);
        Object.assign(this,object);
        this.seat = new Seat(); this.seat.parseJSONObject(object["seat"]);
        this.wagon = new Wagon(); this.wagon.parseJSONObject(object["wagon"]);
        this.travel = new Travel(); this.travel.parseJSONObject(object["travel"]);
        this.route = new Route2(); this.route.parseJSONObject(object["route"]);
        this.cost = new Cost(); this.cost.parseJSONObject(object["cost"]);
        this.passenger_type = new PassengerType(); this.passenger_type.parseJSONObject(object["passenger_type"]);
        this.id_person = 0; this.passenger_type.parseJSONObject(object["id_person"]);
        this.status = 0; this.status = object["status"];
    }
    seat:Seat = new Seat();
    wagon:Wagon = new Wagon();
    travel:Travel = new Travel();
    route:Route2 = new Route2();
    cost:Cost = new Cost();
    passenger_type:PassengerType = new PassengerType();
    id_person:number = 0;
    status:number = 0;
}