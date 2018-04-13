import {Departure} from "./departure";
import { Arrival } from "./arrival";
import { Wagon } from "./wagon";
import { FromJSONable } from "./FromJSONable";

export class Travel implements FromJSONable{
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
    parseJSONObject(object:Object){
        Object.assign(this,object);
        this.departure = new Departure(); this.departure.parseJSONObject(object["departure"]);
        this.arrival = new Arrival(); this.arrival.parseJSONObject(object["arrival"]);
        this.wagons = [];let x:Object[] = object["wagons"];
        for(var i=0;i<x.length;i++){
            let y:Wagon = new Wagon();y.parseJSONObject(x[i]);
            this.wagons.push(y);
        }
    }
    id:number;
    id_src:number;
    id_dst:number;
    departure:Departure = new Departure();
    arrival:Arrival = new Arrival();
    wagons:Wagon[] = [];
    date:string;

    public getWeekday(n:number=-1,full:boolean = true):string{
        if(n == -1){
            let d:Date = new Date(this.date);
            return this.getWeekday(d.getDay());
        }
        if(!full){
            switch(n){
                case 0:return 'Dom';
                case 1:return 'Lun';
                case 2:return 'Mar';
                case 3:return 'Mié';
                case 4:return 'Jue';
                case 5:return 'Vie';
                case 6:return 'Sáb';
            }
        }else{
            switch(n){
                case 0:return 'Domingo';
                case 1:return 'Lunes';
                case 2:return 'Martes';
                case 3:return 'Miércoles';
                case 4:return 'Jueves';
                case 5:return 'Viernes';
                case 6:return 'Sábado';
            }
        }
        

    }
    public getDate(with_weekday:boolean = true):string{
        let d:Date = new Date(this.date);
        var s:string = "";
        if(with_weekday){
            s+=this.getWeekday(d.getDay(),false)+" ";
        }
        s+=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
        return s;
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