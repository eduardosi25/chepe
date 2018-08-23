import { TrainStop } from "./trainstop";
import { Travel } from "./travel";
import { AvailabilityQuery } from "./availabilityquery";
import { Wagon } from "./wagon";
import { SeatBooking } from "./seatbooking";
import { PassengerType } from "./passengertype";
import { AvailabilityQuery2 } from "./availabilityquery2";
import { Route2 } from "./route2";

export class Segment{
    constructor(n:number = 0,src:TrainStop=null,dst:TrainStop=null,travels:Travel[]=[],query:AvailabilityQuery=null){
        this.n = n;
        this.src = src;
        this.dst = dst;
        console.log(dst);
        this.travels = travels;
        if(query != null && this.dst != null){
            this.stops_at_dst = true;// (query.trips.indexOf(this.dst) != -1);
        }
    }
    public src:TrainStop;
    public dst:TrainStop;
    public travels:Travel[];
    public n:number = 0;
    public selected_travel:Travel;
    public previous:Segment = null;
    public stops_at_dst:boolean = false;
    public selected_wagon:Wagon;
    public sbs:SeatBooking[] = null;

    mkDate(s:string):Date{
        var mps:string[] = s.split(" ");
        let now:Date = new Date();
        if(mps.length==1){
            mps.push("00:00:01");
        }
        let dps:string[] = mps[0].split("-");
        let tps:string[] = mps[1].split(":");

        let year:number  = dps.length>=1?parseInt(dps[0]):now.getFullYear();
        let month:number  = dps.length>=2?parseInt(dps[1])-1:now.getMonth();
        let day:number  = dps.length>=3?parseInt(dps[2]):now.getDate();

        let hour:number = tps.length>=1?parseInt(tps[0]):now.getHours();
        let minute:number = tps.length>=2?parseInt(tps[1]):now.getMinutes();
        let second:number = tps.length>=3?parseInt(tps[2]):now.getSeconds();

        let dd:Date = new Date(year,month,day,hour,minute,second);
        return dd;
    }
    public getDuration():string{
        if(this.selected_travel == null){
            return "00:00:00";
        }
        return this.selected_travel.getDuration();
    }
    public getTravels():Travel[]{
        if(this.previous == null){return this.travels;}
        
        return this.getTravelsAfter(this.getMyMinDepartureDate());
        
    }
    public getTravels2(gral_max:Date,segments:Segment[]):Travel[]{
        let min:Date = this.getMyMinDepartureDate();
        let max:Date = this.getMyMaxDepartureDate(gral_max,segments);
        return this.getTravelsAfterAndBefore(min,max);
    }
    private getTravelsAfter(d:Date):Travel[]{
        var travels:Travel[] = [];
        for(var i=0;i<this.travels.length;i++){
            let t:Travel = this.travels[i];
            //let dd:Date = new Date(t.date+" "+t.departure.time);
            let dd:Date = this.mkDate(t.date+" "+t.departure.time);
            if(dd.getTime()>=d.getTime()){
                travels.push(t);
            }
        }
        return travels;
    }
    private getTravelsAfterAndBefore(min:Date,max:Date):Travel[]{
        var travels:Travel[] = [];
        for(var i=0;i<this.travels.length;i++){
            let t:Travel = this.travels[i];
            //let dd:Date = new Date(t.date+" "+t.departure.time);
            let dd:Date = this.mkDate(t.date+" "+t.departure.time);   
            travels.push(t);
            if(dd.getTime()>=min.getTime() && dd.getTime()<=max.getTime()){
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
                let tss:string = t.date+" "+t.departure.time;
                //let dd:Date = new Date(tss);
                let dd:Date = this.mkDate(tss);
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
                //let dd:Date = new Date(this.previous.selected_travel.date+" "+this.previous.selected_travel.arrival.time);
                let dd:Date = this.mkDate(this.previous.selected_travel.date+" "+this.previous.selected_travel.arrival.time);
                if(this.previous.stops_at_dst){
                    dd = new Date(dd.getTime()+(1000*60*60*24));
                }
                return dd;
            }
        }
    }
    public getMyMaxDepartureDate(gral_max:Date,segments:Segment[]):Date{
        let i:number = segments.indexOf(this);
        if(i == -1){
            return gral_max;
        }else{
            var max:Date = gral_max;
            let day:number = 1000*60*60*24;
            for(var j=i;j<segments.length;j++){
                let s:Segment = segments[j];
                if(s.stops_at_dst){
                    max = new Date(max.getTime()-day);
                    max.setHours(23);
                    max.setMinutes(59);
                    max.setSeconds(59);
                }
            }
            return max;
        }
    }
    public getNextPT(route:Route2,query:AvailabilityQuery2):PassengerType{
        for(var i=0;i<route.passenger_types.length;i++){
            let pt:PassengerType = route.passenger_types[i];
            var max:number = query.passengers[pt.id];
            for(var j=0;j<this.sbs.length;j++){
                let sb:SeatBooking = this.sbs[j];
                if(sb.passenger_type.id == pt.id){
                    max--;
                }
            }
            if(max > 0){
                return pt;
            }
        }
        return null;
    }
}