import {WagonType} from "./wagontype"
import {Seat} from "./seat";
export class Wagon {
    public constructor(id:number=0,type:WagonType=null,name:string="",seats:Seat[]=[],status:number=1){
        this.id = id;
        this.type = type;
        this.name = name;
        this.status = status;
        this.seats = seats;
    }
    id: number;
    type: WagonType;
    name: string;
    status: number = 1;
    seats: Seat[];
}