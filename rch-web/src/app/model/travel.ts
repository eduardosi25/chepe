import {Departure} from "./departure";
import { Arrival } from "./arrival";
import { Wagon } from "./wagon";

export class Travel{
    constructor(id:number=0,id_src:number=0,id_dst:number=0,departure:Departure=null,arrival:Arrival=null,wagons:Wagon[]=[],date:string=""){
        this.id = id;
        this.id_dst = id_dst;
        this.id_src = id_src;
        this.departure = departure;
        this.arrival = arrival;
        this.wagons = wagons;
        var dt:Date = new Date(date);
        this.date = dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
    }
    id:number;
    id_src:number;
    id_dst:number;
    departure:Departure;
    arrival:Arrival;
    wagons:Wagon[];
    date:string;

    getWeekday(n:number=0):string{
        switch(n){
            case 0:return 'Dom';
            case 1:return 'Lun';
            case 2:return 'Mar';
            case 3:return 'Mie';
            case 4:return 'Jue';
            case 5:return 'Vie';
            case 6:return 'Sáb';
        }

    }
    public getDate():string{
        let d:Date = new Date(this.date);
        return this.getWeekday(d.getDay())+" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    }
    public getDepartureTime():string{
        return this.departure.time;
    }
    public getArrivalTime():string{
        return this.arrival.time;
    }
    public getDuration():string{
        let dd:Date = new Date(this.date+" "+this.departure.time);
        let ad:Date = new Date(this.date+" "+this.arrival.time);
        var dif:number = ad.getTime()-dd.getTime();
        let s:number = 1000;
        let m:number = s*60;
        let h:number = m*60;
        let hrs:number = Math.ceil(dif/h); dif = dif%h;
        let mins:number = Math.ceil(dif/m);

        let hrss:string = hrs<10 ? '0'+hrs:''+hrs;
        let minss:string = mins<10 ? '0'+mins:''+mins;

        return hrss+":"+minss;
    }
}