import { SeatBooking } from "./seatbooking";
import { FromJSONable } from "./FromJSONable";

export class Seat implements FromJSONable{
    //0 = unavailable 1 = available 2= taken 3= booked
    public static unavailable = 0;
    public static available = 1;
    public static taken = 2;
    public static booked = 3;
    public constructor(id:number=0,id_wagon:number=0,name:string="A1",status:number=1,row:number=0,col:number=0){
        this.id = id;
        this.id_wagon = id_wagon;
        this.name = name;
        this.status = status;
        this.row = row;
        this.col = col;
    }
    parseJSONObject(object:Object){
        Object.assign(this,object);
    }
    id:number;
    id_wagon:number;
    name:string;
    status:number = 1;
    row:number;
    col:number;

    public getStatusClass():string{
        switch(this.status){
            case Seat.unavailable:return "unavailable";
            case Seat.available:return "available";
            case Seat.taken:return "selected";
            case Seat.booked:return "unavailable";
        }
        return "unavailable";
    }
}