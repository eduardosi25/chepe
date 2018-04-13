import {FromJSONable} from "./FromJSONable";
export class Cost implements FromJSONable{
    parseJSONObject(object: Object) {
        Object.assign(this,object);
    }
    id:number;
    id_car_type:number;
    id_passenger_type:number;
    name:string;
    amount:number;
    currency:string;
    status:number = 1;
}