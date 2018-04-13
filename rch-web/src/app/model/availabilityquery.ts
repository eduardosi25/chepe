import { FromJSONable } from "./FromJSONable";

export class AvailabilityQuery implements FromJSONable{
    parseJSONObject(object: Object) {
        Object.assign(this,object);
    }
    id_route:number;
    id_src:number;
    id_dst:number;
    stops:number[];
    start:string;
    end:string;
    passengers:number=1;
}