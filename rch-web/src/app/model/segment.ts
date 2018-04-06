import { TrainStop } from "./trainstop";
import { Travel } from "./travel";
import { AvailabilityQuery } from "./availabilityquery";

export class Segment{
    constructor(n:number = 0,src:TrainStop=null,dst:TrainStop=null,travels:Travel[]=[],query:AvailabilityQuery=null){
        this.n = n;
        this.src = src;
        this.dst = dst;
        this.travels = travels;
        if(query != null && this.dst != null){
            this.stops_at_dst = (query.stops.indexOf(this.dst.id) != -1);
        }
    }
    public src:TrainStop;
    public dst:TrainStop;
    public travels:Travel[];
    public n:number = 0;
    public selected_travel:Travel;
    public previous:Segment = null;
    public stops_at_dst:boolean = false;

    public getTravels():Travel[]{
        if(this.previous == null){return this.travels;}
        
        return this.getTravelsAfter(this.getMyMinDepartureDate());
        
    }
    private getTravelsAfter(d:Date):Travel[]{
        var travels:Travel[] = [];
        for(var i=0;i<this.travels.length;i++){
            let t:Travel = this.travels[i];
            let dd:Date = new Date(t.date+" "+t.departure.time);
            if(dd.getTime()>=d.getTime()){
                travels.push(t);
            }
        }
        return travels;
    }
    public getMyMinDepartureDate():Date{
        if(this.previous == null){
            var d:Date=null;
            for(var i=0;i<this.travels.length;i++){
                let t:Travel = this.travels[i];
                let dd:Date = new Date(t.date+" "+t.departure.time);
                if(d == null){
                    d = dd;
                    continue;
                }
                if(dd.getTime()<d.getTime()){
                    d = dd;
                }
            }
            return d;
        }else{
            if(this.previous.selected_travel == null){
                let dd:Date = this.previous.getMyMinDepartureDate();
                if(this.previous.stops_at_dst){
                    dd = new Date(dd.getTime()+(1000*60*60*24));
                }
                return dd;
            }else{
                let dd:Date = new Date(this.previous.selected_travel.date+" "+this.previous.selected_travel.arrival.time);
                if(this.previous.stops_at_dst){
                    dd = new Date(dd.getTime()+(1000*60*60*24));
                }
                return dd;
            }
        }
    }
}