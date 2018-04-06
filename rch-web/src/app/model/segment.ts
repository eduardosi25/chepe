import { TrainStop } from "./trainstop";
import { Travel } from "./travel";
import { AvailabilityQuery } from "./availabilityquery";
import { Wagon } from "./wagon";
import { SeatBooking } from "./seatbooking";
import { PassengerType } from "./passengertype";
import { AvailabilityQuery2 } from "./availabilityquery2";
import { Route } from "./Route";

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
    public selected_wagon:Wagon;
    public sbs:SeatBooking[] = null;

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
    public getNextPT(route:Route,query:AvailabilityQuery2):PassengerType{
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