import { PassengerType } from "./passengertype";
import { FromJSONable } from "./FromJSONable";

export class Person implements FromJSONable{
    id:number;
    id_passenger_type:number;
    name:string;
    lastname:string;
    lastname2:string;
    country:string;
    type:PassengerType = new PassengerType();
    parseJSONObject(object: Object) {
        Object.assign(this,object);
        this.type = new PassengerType();this.type.parseJSONObject(object["type"]);
    }
}