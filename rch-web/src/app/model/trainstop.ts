import {Departure} from "./departure";
export class TrainStop{
    id:number;
    name:string;
    departures:Departure[];
    latitude:number;
    longitude:number;
    details:string;
    status:number = 1;
}