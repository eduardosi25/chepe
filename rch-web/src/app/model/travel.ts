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
        if(!object){return;}
        Object.assign(this,object);
        this.departure = new Departure(); this.departure.parseJSONObject(object["departure"]);
        this.arrival = new Arrival(); this.arrival.parseJSONObject(object["arrival"]);
        this.wagons = [];let x:Object[] = object["wagons"];
        if(x){
            for(var i=0;i<x.length;i++){
                let y:Wagon = new Wagon();y.parseJSONObject(x[i]);
                this.wagons.push(y);
            }
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
            //let d:Date = new Date(this.date);
            let d:Date = this.mkDate(this.date);
            return this.getWeekday(d.getDay(),full);
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
        //let d:Date = new Date(this.date);
        let d:Date = this.mkDate(this.date);
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
    public getDepartureDateTime():string{
        return this.date+" "+this.departure.time;
    }
    public getArrivalDateTime():string{
        return this.date+" "+this.arrival.time;
    }
    public getDuration():string{
        let dd:Date = this.mkDate(this.getDepartureDateTime());
        let ad:Date = this.mkDate(this.getArrivalDateTime());
        // console.log(this.getArrivalDateTime());
        // console.log(this.getDepartureDateTime());
        if (this.getArrivalDateTime() < this.getDepartureDateTime()) {
            dd = this.mkDate(this.getArrivalDateTime());  
            ad = this.mkDate(this.getDepartureDateTime());
        };
        var dif:number = ad.getTime()-dd.getTime()
        let s:number = 1000;
        let m:number = s*60;
        let h:number = m*60;
        let hrs:number = Math.ceil(dif/h)-1; dif = dif%h;
        let mins:number = Math.ceil(dif/m);
        
        let hrss:string = hrs<10 ? '0'+hrs:''+hrs;
        let minss:string = mins<10 ? '0'+mins:''+mins;

        return hrss+":"+minss;
    }
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
}