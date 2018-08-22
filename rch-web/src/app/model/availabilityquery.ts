import { FromJSONable } from "./FromJSONable";
import { PassengerType } from "./passengertype";
import {environment} from "../../environments/environment";
import { Trip } from "./trip";
import { TrainStop } from "./trainstop";

export class AvailabilityQuery implements FromJSONable{
    parseJSONObject(object: Object) {
        if(!object){return;}
        Object.assign(this,object);
    }
    id_route:number;
    // id_src:number;
    // id_dst:number;
    // stops:number[];
    // start:string;
    // end:string;
    trips:Trip[] = [];
    //passengers:number=1;
    passengers:PassengerType[]=[];
    round:boolean=false;
    id_class:number;

    public getForParams():object{
        console.log("pass");
        console.log(this.passengers)
        let pts = environment.avmode == 1 ? this.passengers:this.getPTsIds();
        console.log(this.trips);
        let s:string;
        this.trips.forEach(e => {
            let tsp : any = e.id_src;
            let tsp2 : any = e.id_dst;
            console.log("e");
            console.log(e);
            console.log("tsp");
            console.log(tsp.id);
            s = tsp.id + ',' + tsp2.id + ',' + e.start;
        });

        console.log(JSON.stringify(s));
        return {
            'passengers':pts,
            // 'src':this.id_src,
            // 'dst':this.id_dst,
            // 'start':this.start,
            // 'end':this.end,
            // 'stops':JSON.stringify(this.stops),
            'trips':s,
            'round':this.round,
            'class':this.id_class
          };
    }
    getPTsIds():number[]{
        var a : number[] = [];
        for(var i=0;i<this.passengers.length;i++){
            let pt:PassengerType = this.passengers[i];
            a.push(pt.id);
        }
        console.log("pts");
        console.log(a);
        return a;
    }
}