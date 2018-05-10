import { FromJSONable } from "./FromJSONable";
import { PassengerType } from "./passengertype";

export class AvailabilityQuery implements FromJSONable{
    parseJSONObject(object: Object) {
        if(!object){return;}
        Object.assign(this,object);
    }
    id_route:number;
    id_src:number;
    id_dst:number;
    stops:number[];
    start:string;
    end:string;
    //passengers:number=1;
    passengers:PassengerType[]=[];
    round:boolean=false;
    class:string;

    public getForParams():object{
        return {
            'passengers':this.passengers,
            'src':this.id_src,
            'dst':this.id_dst,
            'start':this.start,
            'end':this.end,
            'stops':JSON.stringify(this.stops),
            'round':this.round,
            'class':this.class
          };
    }
}