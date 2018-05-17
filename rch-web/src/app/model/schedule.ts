import {AvailabilityQuery} from "./availabilityquery";
import { Travel } from "./travel";
import { FromJSONable } from "./FromJSONable";
export class Schedule implements FromJSONable{
    query:AvailabilityQuery = new AvailabilityQuery();
    travels:Travel[] = [];
    cost:number = -1;
    currency:string = "MXN";
    parseJSONObject(object:Object){
        if(!object){return;}
        this.query = new AvailabilityQuery(); this.query.parseJSONObject(object["query"]);
        this.travels = []; var x:Object[] = object["travels"];
        if(x){
            for(var i=0;i<x.length;i++){
                let y:Travel = new Travel();y.parseJSONObject(x[i]);
                this.travels.push(y);
            }
        }
        if(object.hasOwnProperty('cost')){
            this.cost = Number.parseFloat(object["cost"]);
        }
        if(object.hasOwnProperty('currency')){
            this.currency = object['currency'];
        }
    }
}