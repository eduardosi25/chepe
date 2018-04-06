import { TrainStop } from "./trainstop";
import { Travel } from "./travel";

export class Segment{
    constructor(n:number = 0,src:TrainStop=null,dst:TrainStop=null,travels:Travel[]=[]){
        this.n = n;
        this.src = src;
        this.dst = dst;
        this.travels = travels;
    }
    public src:TrainStop;
    public dst:TrainStop;
    public travels:Travel[];
    public n:number = 0;
    public selected_travel:Travel;
    public previous:Segment = null;

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
                return this.previous.getMyMinDepartureDate();
            }else{
                let dd:Date = new Date(this.previous.selected_travel.date+" "+this.previous.selected_travel.arrival.time);
                return dd;
            }
        }
    }
}