import { PassengerType } from "./passengertype";

export class Person{
    id:number;
    id_passenger_type:number;
    name:string;
    lastname:string;
    lastname2:string;
    country:string;
    type:PassengerType = new PassengerType();
}