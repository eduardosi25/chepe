import { Injectable } from '@angular/core';
import { IModel } from './model/imodel';
import { Route } from './model/route';
import { Intent } from './model/intent';
import { SessionToken } from './model/sessiontoken';
import { Schedule } from './model/schedule';
import { RouteBooking } from './model/routebooking';
import { Travel } from './model/travel';
import { Response } from './model/response';
import { PassengerType } from './model/passengertype';
import { TrainStop } from './model/trainstop';
import { Wagon } from './model/wagon';
import { Departure } from './model/departure';
import { WagonType } from './model/wagontype';
import { Seat } from './model/seat';
import { AvailabilityQuery } from './model/availabilityquery';
import { Direction } from './model/direction';
import { SeatBooking } from './model/seatbooking';

@Injectable()
export class ModelDummyService implements IModel {

  constructor() { }

  getStdPassengerTypes():PassengerType[]{
    return [new PassengerType(1,"Adultos","",1,100),
            new PassengerType(2,"Menor","(de 5 a 11 años)",0,100),
            new PassengerType(3,"INSEN","",0,100),
            new PassengerType(4,"Estudiante","",0,100),
            new PassengerType(5,"Profesor","",0,100),
            new PassengerType(6,"Personas con discapacidad","",0,100)];
  }
  rss():number{
    let r:number = Math.random();
    let r2:number = Math.floor(r*5);
    return r2;
  }
  private get_routes:Response<Route[]> = null;
  getRoutes():Response<Route[]>{
    if(this.get_routes != null){return this.get_routes;}
    //wagon types
    var wt1 = new WagonType(1,"Premium",1);
    var wt2 = new WagonType(2,"Clásico",1);
    var wt3 = new WagonType(3,"Bar",1);
    var wt4 = new WagonType(4,"Terraza",1);
    var wt5 = new WagonType(5,"Restaurante Urike",1);
    var wt6 = new WagonType(6,"Turista",1);
    var wt7 = new WagonType(7,"Cafetería",1);
    //chepe express
    var rexpress:Route = new Route();
    rexpress.id = 2;
    rexpress.max_stops = 3;
    rexpress.name = "Chepe Express";
    rexpress.passenger_types = this.getStdPassengerTypes();
    rexpress.stops = [
      new TrainStop(20,"CREEL",[new Departure(1,1,0,"15:00:00",Direction.down,1),new Departure(1,1,0,"07:00:00",Direction.up,1)],27.75556,-107.6349,"",564,1),
      new TrainStop(22,"DIVISADERO",[new Departure(1,1,0,"14:00:00",Direction.down,1),new Departure(1,1,0,"08:00:00",Direction.up,1)],27.53413,-107.82507,"",622,1),
      new TrainStop(39,"EL FUERTE",[new Departure(1,1,0,"13:00:00",Direction.down,1),new Departure(1,1,0,"09:00:00",Direction.up,1)],26.3645,-108.59235,"",839,1),
      new TrainStop(42,"LOS MOCHIS",[new Departure(1,1,0,"12:00:00",Direction.down,1),new Departure(1,1,0,"10:00:00",Direction.up,1)],25.75877,-108.96825,"",921,1)];
    rexpress.wagons = [
      new Wagon(1,wt1,"001",[new Seat(1,1,"A1",this.rss()),new Seat(2,1,"A2",this.rss()),new Seat(3,1,"A3",this.rss()),new Seat(4,1,"A4",this.rss())],1),
      new Wagon(2,wt1,"002",[new Seat(21,2,"A1",this.rss()),new Seat(22,2,"A2",this.rss()),new Seat(23,2,"A3",this.rss()),new Seat(24,2,"A4",this.rss())],1),
      new Wagon(3,wt2,"003",[new Seat(31,3,"A1",this.rss()),new Seat(32,3,"A2",this.rss()),new Seat(33,3,"A3",this.rss()),new Seat(34,3,"A4",this.rss())],1),
      new Wagon(4,wt2,"004",[new Seat(41,4,"A1",this.rss()),new Seat(42,4,"A2",this.rss()),new Seat(43,4,"A3",this.rss()),new Seat(44,4,"A4",this.rss())],1),
      new Wagon(5,wt3,"005",[new Seat(51,5,"A1",this.rss()),new Seat(52,5,"A2",this.rss()),new Seat(53,5,"A3",this.rss()),new Seat(54,5,"A4",this.rss())],1),
      new Wagon(6,wt4,"006",[new Seat(61,6,"A1",this.rss()),new Seat(62,6,"A2",this.rss()),new Seat(63,6,"A3",this.rss()),new Seat(64,6,"A4",this.rss())],1),
      new Wagon(7,wt5,"007",[new Seat(71,7,"A1",this.rss()),new Seat(72,7,"A2",this.rss()),new Seat(73,7,"A3",this.rss()),new Seat(74,7,"A4",this.rss())],1)];
    rexpress.img_url="assets/img/reservacion/header-reserva-express.jpg";
    rexpress.img_map="assets/img/reservacion/map_express.jpg";
    //chepe regional
    var rregional:Route = new Route();
    rregional.id = 1;
    rregional.max_stops = 3;
    rregional.name = "Chepe Regional";
    rregional.passenger_types = this.getStdPassengerTypes();
    rregional.stops = [
      new TrainStop(1,"CHIHUAHUA",[new Departure(1,1,0,"00:00:00",Direction.down,1),new Departure(1,1,0,"07:00:00",Direction.up,1)],28.61614,-106.07513,"",268,1),
      new TrainStop(9,"CUAUHTEMOC",[new Departure(1,1,0,"23:00:00",Direction.down,1),new Departure(1,1,0,"08:00:00",Direction.up,1)],28.40865,-106.86975,"",401,1),
      new TrainStop(18,"SAN JUANITO",[new Departure(1,1,0,"22:00:00",Direction.down,1),new Departure(1,1,0,"09:00:00",Direction.up,1)],27.9704,-107.59967,"",533,1),
      new TrainStop(21,"PITORREAL",[new Departure(1,1,0,"21:00:00",Direction.down,1),new Departure(1,1,0,"10:00:00",Direction.up,1)],27.62885,-107.7686,"",602,1),
      new TrainStop(23,"P. BARRANCAS",[new Departure(1,1,0,"20:00:00",Direction.down,1),new Departure(1,1,0,"11:00:00",Direction.up,1)],27.50991,-107.84014,"",626,1),
      new TrainStop(24,"SAN RAFAEL",[new Departure(1,1,0,"19:00:00",Direction.down,1),new Departure(1,1,0,"12:00:00",Direction.up,1)],27.48831,-107.88949,"",636,1),
      new TrainStop(25,"CUITECO",[new Departure(1,1,0,"18:00:00",Direction.down,1),new Departure(1,1,0,"13:00:00",Direction.up,1)],27.4397,-108.02283,"",662,1),
      new TrainStop(26,"BAHUICHIVO",[new Departure(1,1,0,"17:00:00",Direction.down,1),new Departure(1,1,0,"14:00:00",Direction.up,1)],27.40669,-108.07234,"",669,1),
      new TrainStop(30,"TEMORIS",[new Departure(1,1,0,"16:00:00",Direction.down,1),new Departure(1,1,0,"15:00:00",Direction.up,1)],27.2551,-108.25694,"",708,1)];
    rregional.wagons = [
      new Wagon(1,wt6,"001",[new Seat(1,1,"A1",this.rss()),new Seat(2,1,"A2",this.rss()),new Seat(3,1,"A3",this.rss()),new Seat(4,1,"A4",this.rss())],1),
      new Wagon(2,wt7,"002",[new Seat(21,2,"A1",this.rss()),new Seat(22,2,"A2",this.rss()),new Seat(23,2,"A3",this.rss()),new Seat(24,2,"A4",this.rss())],1),
      new Wagon(3,wt6,"003",[new Seat(31,3,"A1",this.rss()),new Seat(32,3,"A2",this.rss()),new Seat(33,3,"A3",this.rss()),new Seat(34,3,"A4",this.rss())],1),
      new Wagon(4,wt7,"004",[new Seat(41,4,"A1",this.rss()),new Seat(42,4,"A2",this.rss()),new Seat(43,4,"A3",this.rss()),new Seat(44,4,"A4",this.rss())],1),
      new Wagon(5,wt6,"005",[new Seat(51,5,"A1",this.rss()),new Seat(52,5,"A2",this.rss()),new Seat(53,5,"A3",this.rss()),new Seat(54,5,"A4",this.rss())],1),
      new Wagon(6,wt7,"006",[new Seat(61,6,"A1",this.rss()),new Seat(62,6,"A2",this.rss()),new Seat(63,6,"A3",this.rss()),new Seat(64,6,"A4",this.rss())],1),
      new Wagon(7,wt6,"007",[new Seat(71,7,"A1",this.rss()),new Seat(72,7,"A2",this.rss()),new Seat(73,7,"A3",this.rss()),new Seat(74,7,"A4",this.rss())],1)];
    rregional.img_url = "assets/img/reservacion/header-reserva-regional.jpg";
    rregional.img_map="assets/img/reservacion/map_regional.jpg";
    //response
    var response:Response<Route[]> = new Response<Route[]>("+RCH.WS12.0",null,[rexpress,rregional]);
    this.get_routes = response;
    return response;
  }
  createIntent(type:string):Response<Intent>{
    let intent:Intent = new Intent("xyz");
    return new Response("+RCH.WS2.0",null,intent);
  }
  createSession():Response<SessionToken>{
    let st:SessionToken = new SessionToken("abc");
    return new Response("+RCH.WS3.0",null,st);
  }
  getStatus():Response<boolean>{
    return new Response("+RCH.WS1.0",null,true);
  }
  private get_route_schedule_available={};
  private travels={};
  getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Response<Schedule>{
    if(this.get_route_schedule_available[id]){return this.get_route_schedule_available[id];}
    var schedule:Schedule = new Schedule();
    schedule.query = query;
    schedule.travels = [];

    let routes:Route[] = this.getRoutes().data;
    var route:Route = routes[0];
    for(var i=0;i<routes.length;i++){
      let r:Route = routes[i];
      if(r.id == id){
        route = r;
        break;
      }
    }
    var date:Date = new Date(query.start);
    let day:number = 1000*60*60*24;
    for(var i=0;i<(route.stops.length-1);i++){
      let ts0:TrainStop = route.stops[i];
      let ts1:TrainStop = route.stops[i+1];
      let direction:number = route.getDirection(ts0,ts1);
      let t:Travel = new Travel((i*3)+1,ts0.id,ts1.id,ts0.getDeparture(direction),ts1.getDeparture(direction),route.wagons,date.toString());
      let t2:Travel = new Travel((i*3)+2,ts0.id,ts1.id,ts0.getDeparture(direction),ts1.getDeparture(direction),route.wagons,new Date(date.getTime()+day).toString());
      let t3:Travel = new Travel((i*3)+3,ts0.id,ts1.id,ts0.getDeparture(direction),ts1.getDeparture(direction),route.wagons,new Date(date.getTime()+day+day).toString());
      this.travels[t.id] =t;
      this.travels[t2.id] =t2;
      this.travels[t3.id] =t3;
      schedule.travels.push(t,t2,t3);
      if(query.stops.indexOf(ts1.id)){
        date = new Date(date.getTime()+day);
      }
    }

    this.get_route_schedule_available[id] = new Response("+RCH.WS13.0",null,schedule);
    return this.get_route_schedule_available[id];
  }
  saveRouteBooking(b:RouteBooking):Response<RouteBooking>{
    var rb:RouteBooking = b;
    rb.status = 1;
    
    for(var i=0;i<b.seats.length;i++){
      let sb:SeatBooking = b.seats[i];
      sb.seat.status = this.rss();
    }
    rb.status = this.rss();
    var response:Response<RouteBooking> = new Response<RouteBooking>("+RCH.WS14.0",null,rb);
    return response;
  }
  getTravel(id:number):Response<Travel>{
    if(this.travels[id]){return this.travels[id];}
    return null;
  }
}
