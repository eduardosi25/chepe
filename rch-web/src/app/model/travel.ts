import {Departure} from "./departure";
import { Arrival } from "./arrival";
import { Wagon } from "./wagon";

export class Travel{
    constructor(id_src:number=0,id_dst:number=0,departure:Departure=null,arrival:Arrival=null,wagons:Wagon[]=[],date:string=""){
        this.id_dst = id_dst;
        this.id_src = id_src;
        this.departure = departure;
        this.arrival = arrival;
        this.wagons = wagons;
        this.date = date;
    }
    id_src:number;
    id_dst:number;
    departure:Departure;
    arrival:Arrival;
    wagons:Wagon[];
    date:string;
}