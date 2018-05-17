import { FromJSONable } from "./FromJSONable";
import { PassengerType } from "./passengertype";
import {environment} from "../../environments/environment";

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
        let pts = environment.avmode == 1 ? this.passengers:this.getPTsIds();
        return {
            'passengers':pts,
            'src':this.id_src,
            'dst':this.id_dst,
            'start':this.start,
            'end':this.end,
            'stops':JSON.stringify(this.stops),
            'round':this.round,
            'class':this.class
          };
    }
    getPTsIds():number[]{
        var a : number[] = [];
        for(var i=0;i<this.passengers.length;i++){
            let pt:PassengerType = this.passengers[i];
            a.push(pt.id);
        }
        return a;
    }
}