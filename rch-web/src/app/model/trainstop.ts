import {Departure} from "./departure";
export class TrainStop{
    public constructor(id:number=0,name:string="",departures:Departure[]=[],latitude:number=0.0,longitude:number=0.0,details:string="",km:number=0,status:number=1){
        this.id = id;
        this.name = name;
        this.departures = departures;
        this.latitude = latitude;
        this.longitude = longitude;
        this.details = details;
        this.status = status;
        this.km = km;
    }
    id:number;
    name:string;
    departures:Departure[];
    latitude:number;
    longitude:number;
    details:string;
    status:number = 1;
    km:number = 0;

    public getDeparture(direction:number):Departure{
        for(var i=0;i<this.departures.length;i++){
            let d:Departure = this.departures[i];
            if(d.direction == direction){return d;}
        }
        return this.departures.length>0 ? this.departures[0]:null;
    }
}