import { TrainStop } from "./trainstop";
import { AvailabilityQuery } from "./availabilityquery";
import { PassengerType } from "./passengertype";
import { FromJSONable } from "./FromJSONable";
import { ModelService } from "../model.service";
import { Route2 } from "./route2";
import { WagonType } from "./wagontype";

export class AvailabilityQuery2 implements FromJSONable{
    constructor(private model:ModelService){}
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
    public round:boolean = false;
    public class:WagonType = null;
    public isReady():boolean{
        if(this.src.id == -1){return false;}
        if(this.dst.id == -1){return false;}
        if(this.class == null){return false;}
        return true;
    }
    /* Sólo obtiene la suma de pasajeros */
    public getTotalPassengers():number{
        var n:number = 0;

        for(var i in this.passengers){
            let n2:number = this.passengers[i];
            n+=n2;
        }

        return n;
    }
    /* Obtiene un PassengerType por cada passenger, regresando asi un array con N pasajeros, donde los elementos son PassengerType.
    Esto en efecto implica que el array devuelto puede tener PassengerTypes repetidos: Uno por cada pasajero de ese tipo */
    public getTotalPassengers2():PassengerType[]{
        var r:PassengerType[] = [];
        for(var i=0;i<this.passengers.length;i++){
            let n2:number = this.passengers[i];
            let pt:PassengerType = this.model.getPassengerTypeById(i);
            if(n2 > 0 && pt != null){
                for(var j=0;j<n2;j++){
                    r.push(pt);
                }
            }
        }
        return r;
    }
    public getPassengersString(route:Route2):string{
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
    public toAvailabilityQuery(route:Route2):AvailabilityQuery{
        var a:AvailabilityQuery = new AvailabilityQuery();
        a.end = this.end;
        a.id_dst = this.dst.id;
        a.id_route = route.id;
        a.id_src = this.src.id;
        a.passengers = this.getTotalPassengers2();
        a.start = this.start;
        a.stops = [];
        a.round = this.round;
        a.id_class = this.class.id;
        for(var i in this.stops){
            var n:number = parseInt(i);
            a.stops.push(n);
        }
        return a;
    }
}