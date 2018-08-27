import { Seat } from "./seat";
import { Travel } from "./travel";
import { Person } from "./person";
import { SeatBooking } from "./seatbooking";
import { SessionService } from "../session.service";
import { Segment } from "./segment";
import { PassengerType } from "./passengertype";
import { FromJSONable } from "./FromJSONable";
import { Wagon } from "./wagon";
import { Route2 } from "./route2";
import { Cost } from "./cost";
//0 = inactive 1= editing 2= booked 3= paid 4= cancelled
export class RouteBooking implements FromJSONable{
    public static inactive:number = 0;
    public static editing:number = 1;
    public static booked:number = 2;
    public static paid:number = 3;
    public static cancel:number = 4;
    public id:number;
    public status:number=1;
    public seats:SeatBooking[]=[];
    public persons:Person[]=[];
    public etickets_email:string="";
    public etickets_email2:string="";
    public etickets_phone:string="";
    public travels:Travel[]=[];
    public pp:boolean=false;
    public round:boolean=false;
    parseJSONObject(object:Object){
        if(!object){return;}
        Object.assign(this,object);
        this.seats = []; var x:Object[] = object["seats"];
        console.log("seats");
        console.log( object["seats"]);
        console.log(x);
        if(x){
            for(var i=0;i<x.length;i++){
                let y:SeatBooking = new SeatBooking(new Seat(), new Wagon(), new Travel(), new Route2(), new PassengerType(),
                new Cost(), 0, 0);
                y.parseJSONObject(x[i]);
                this.seats.push(y);
            }
        }
        this.persons = []; var x:Object[] = object["persons"];
        if(x){
            for(var i=0;i<x.length;i++){
                let y:Person = new Person();y.parseJSONObject(x[i]);
                y.id = i;
                this.persons.push(y);
            }
        }
        this.travels = []; var x:Object[] = object["travels"];
        if(x){
            for(var i=0;i<x.length;i++){
                let y:Travel = new Travel();y.parseJSONObject(x[i]);
                this.travels.push(y);
            }
        }
    }
    public setupFromSession(session:SessionService){
        //setup travels
        for(var i=0;i<session.segments.length;i++){
            let s:Segment = session.segments[i];
            this.travels.push(s.selected_travel);
        }
        if(session.query.round && session.segments2!=null){
            for(var i=0;i<session.segments2.length;i++){
                let s:Segment = session.segments2[i];
                this.travels.push(s.selected_travel);
            }   
        }
        this.round = session.query.round;
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