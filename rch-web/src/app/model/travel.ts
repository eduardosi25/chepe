import {Departure} from "./departure";
import { Arrival } from "./arrival";
import { Wagon } from "./wagon";

export class Travel{
    id_src:number;
    id_dst:number;
    departure:Departure;
    arrival:Arrival;
    wagons:Wagon[];
}