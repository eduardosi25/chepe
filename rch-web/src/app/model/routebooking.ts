import { Seat } from "./seat";
import { Travel } from "./travel";
import { Person } from "./person";
import { SeatBooking } from "./seatbooking";
import { SessionService } from "../session.service";
import { Segment } from "./segment";
import { PassengerType } from "./passengertype";

export class RouteBooking{
    public id:number;
    public status:number=1;
    public seats:SeatBooking[]=[];
    public persons:Person[]=[];
    public etickets_email:string="";
    public etickets_phone:string="";
    public travels:Travel[]=[];
    public pp:boolean=false;

    public setupFromSession(session:SessionService){
        //setup travels
        for(var i=0;i<session.segments.length;i++){
            let s:Segment = session.segments[i];
            this.travels.push(s.selected_travel);
        }
        //setup persons
        for(var i=0;i<session.route.passenger_types.length;i++){
            let pt:PassengerType = session.route.passenger_types[i];
            let ptq:number = session.query.passengers[pt.id];
            for(var j=0;j<ptq;j++){
                var p:Person = new Person();
                p.type = pt;
                p.id_passenger_type = pt.id;
                p.id = 0;
                this.persons.push(p);
            }
        }
    }
}