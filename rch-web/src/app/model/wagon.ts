import {WagonType} from "./wagontype"
import {Seat} from "./seat";
import { WagonRow } from "./wagonrow";
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

    private rows:WagonRow[] = null;
    public getRows():WagonRow[]{
        if(this.rows == null){
            this.rows = [];
            for(var i=0;i<this.seats.length;i++){
                let seat:Seat = this.seats[i];
                var row:WagonRow = this.rows[seat.row];
                if(!row){
                    this.rows[seat.row] = new WagonRow();
                    row = this.rows[seat.row];
                }
                row.cols[seat.col] = seat;
            }
        }
        return this.rows;
    }
    public getSeat(row:number,col:number):Seat{
        for(var i=0;i<this.seats.length;i++){
            let s:Seat = this.seats[i];
            if(s.row == row && s.col == col){
                return s;
            }
        }
        return null;
    }
}