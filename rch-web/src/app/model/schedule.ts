import {AvailabilityQuery} from "./availabilityquery";
import { Travel } from "./travel";
import { FromJSONable } from "./FromJSONable";
export class Schedule implements FromJSONable{
    query:AvailabilityQuery = new AvailabilityQuery();
    travels:Travel[] = [];
    parseJSONObject(object:Object){
        this.query = new AvailabilityQuery(); this.query.parseJSONObject(object["query"]);
        this.travels = []; var x:Object[] = object["travels"];
        for(var i=0;i<x.length;i++){
            let y:Travel = new Travel();y.parseJSONObject(x[i]);
            this.travels.push(y);
        }
    }
}