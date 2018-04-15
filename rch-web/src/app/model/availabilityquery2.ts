import { TrainStop } from "./trainstop";
import { AvailabilityQuery } from "./availabilityquery";
import { PassengerType } from "./passengertype";
import { Route } from "./Route";
import { FromJSONable } from "./FromJSONable";

export class AvailabilityQuery2 implements FromJSONable{
    constructor(){}
    parseJSONObject(object: Object) {
        if(!object){return;}
        Object.assign(this,object);
        this.src = new TrainStop(); this.src.parseJSONObject(object["src"]);
        this.dst = new TrainStop(); this.dst.parseJSONObject(object["dst"]);
    }
    public src:TrainStop = new TrainStop();
    public dst:TrainStop = new TrainStop();
    public start:string = (new Date()).toString();
    public end:string = (new Date()).toString();
    public passengers = [0,1,0,0,0,0,0,0,0];
    public stops = {};
    public getTotalPassengers():number{
        var n:number = 0;

        for(var i in this.passengers){
            let n2:number = this.passengers[i];
            n+=n2;
        }

        return n;
    }
    public getPassengersString(route:Route):string{
        var pps:string[] = [];
        for(var i=0;i<route.passenger_types.length;i++){
        let pt:PassengerType = route.passenger_types[i];
        let q:number = this.passengers[pt.id];
        if(q > 0){
            pps.push(pt.name+": "+q);
        }
        }
        return pps.join(", ");
    }
    public toAvailabilityQuery(route:Route):AvailabilityQuery{
        var a:AvailabilityQuery = new AvailabilityQuery();
        a.end = this.end;
        a.id_dst = this.dst.id;
        a.id_route = route.id;
        a.id_src = this.src.id;
        a.passengers = this.getTotalPassengers();
        a.start = this.start;
        a.stops = [];
        for(var i in this.stops){
            var n:number = parseInt(i);
            a.stops.push(n);
        }
        return a;
    }
}