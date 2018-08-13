import { Injectable } from '@angular/core';
import { IModel } from './model/imodel';
import { Route2 } from './model/route2';
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
import { Cost } from './model/cost';
import {Observable} from "rxjs/Rx";
import { UrlWebPay } from './model/url';
import { WebPay } from './model/webpay';
import { Referencia } from './model/referencia';
import { Country } from './model/country';

@Injectable()
export class ModelDummyService implements IModel {

  constructor() { }

  getStdPassengerTypes():PassengerType[]{
    return [new PassengerType(1,"Adultos ","(12+ años)",1,100),
            new PassengerType(2,"Infante ","(0-4 años)",0,100),
            new PassengerType(3,"Menor ","(5-11 años)",0,100),
            new PassengerType(4,"INSEN","",0,100),
            new PassengerType(5,"Estudiante","",0,100),
            new PassengerType(5,"Profesor","",0,100),
            new PassengerType(6,"Discapacitado","",0,100)];
  }
  rss():number{
    let r:number = Math.random();
    let r2:number = Math.floor(r*5);
    if(r2 == Seat.taken){
      r2 = Seat.available;
    }
    return r2;
  }
  private get_routes:Response<Route2[]> = null;
  getRoutes():Observable<Response<Route2[]>>{
    if(this.get_routes != null){
      return Observable.of(this.get_routes);
      //return this.get_routes;
    }
    //wagon types
    var wt1 = new WagonType(1,"Ejecutiva",1);
    var wt2 = new WagonType(2,"Turista",1);
    var wt3 = new WagonType(3,"Ejecutiva",1,"","assets/img/reservacion/vagon-premium.png");
    var wt4 = new WagonType(4,"Turista",1);
    /*var wt3 = new WagonType(3,"Bar",1);
    var wt4 = new WagonType(4,"Terraza",1);
    var wt5 = new WagonType(5,"Restaurante Urike",1);
    var wt6 = new WagonType(6,"Turista",1);
    var wt7 = new WagonType(7,"Cafetería",1);*/
    //chepe express
    var rexpress:Route2 = new Route2();
    rexpress.id = 2;
    rexpress.max_stops = 2;
    rexpress.name = "Chepe Express";
    rexpress.passenger_types = this.getStdPassengerTypes();
    let w1=610;let h1=610;
    rexpress.stops = [
      new TrainStop(20,"CREEL",[new Departure(1,1,0,"21:30:00",Direction.down,1),new Departure(1,1,0,"09:30:00",Direction.up,1)],27.75556,-107.6349,"",564,1,411/w1,44/h1),
      new TrainStop(22,"DIVISADERO",[new Departure(1,1,0,"20:30:00",Direction.down,1),new Departure(1,1,0,"10:30:00",Direction.up,1)],27.53413,-107.82507,"",622,1,330/w1,105/h1),
      new TrainStop(39,"EL FUERTE",[new Departure(1,1,0,"16:20:00",Direction.down,1),new Departure(1,1,0,"14:40:00",Direction.up,1)],26.3645,-108.59235,"",839,1,148/w1,388/h1),
      new TrainStop(42,"LOS MOCHIS",[new Departure(1,1,0,"16:00:00",Direction.down,1),new Departure(1,1,0,"15:00:00",Direction.up,1)],25.75877,-108.96825,"",921,1,62/w1,530/h1)];
    rexpress.wagons = [
      this.mkWagon(wt3),
      this.mkWagon(wt3),
      this.mkWagon(wt4),
      this.mkWagon(wt4),
      this.mkWagon(wt4),
      this.mkWagon(wt4)
      ];
    rexpress.img_url="assets/img/reservacion/header-reserva-express.jpg";
    rexpress.img_map="assets/img/reservacion/map_express.jpg";
    rexpress.img_map_full="assets/img/reservacion/map_express_full.jpg";
    //chepe regional
    var rregional:Route2 = new Route2();
    rregional.id = 1;
    rregional.max_stops = 2;
    rregional.name = "Chepe Regional";
    rregional.passenger_types = this.getStdPassengerTypes();
    rregional.stops = [
      new TrainStop(1,"CHIHUAHUA",[new Departure(1,1,0,"00:00:00",Direction.down,1),new Departure(1,1,0,"07:00:00",Direction.up,1)],28.61614,-106.07513,"",268,1,502/w1,32/h1),
      new TrainStop(9,"CUAUHTEMOC",[new Departure(1,1,0,"23:00:00",Direction.down,1),new Departure(1,1,0,"08:00:00",Direction.up,1)],28.40865,-106.86975,"",401,1,370/w1,71/h1),
      new TrainStop(18,"SAN JUANITO",[new Departure(1,1,0,"22:00:00",Direction.down,1),new Departure(1,1,0,"09:00:00",Direction.up,1)],27.9704,-107.59967,"",533,1,316/w1,99/h1),
      new TrainStop(20,"CREEL",[new Departure(1,1,0,"21:30:00",Direction.down,1),new Departure(1,1,0,"09:30:00",Direction.up,1)],27.75556,-107.6349,"",564,1,301/w1,150/h1),
      new TrainStop(21,"PITORREAL",[new Departure(1,1,0,"21:00:00",Direction.down,1),new Departure(1,1,0,"10:00:00",Direction.up,1)],27.62885,-107.7686,"",602,1,269/w1,167/h1),
      new TrainStop(22,"DIVISADERO",[new Departure(1,1,0,"20:30:00",Direction.down,1),new Departure(1,1,0,"10:30:00",Direction.up,1)],27.53413,-107.82507,"",622,1,240/w1,196/h1),
      new TrainStop(23,"P. BARRANCAS",[new Departure(1,1,0,"20:00:00",Direction.down,1),new Departure(1,1,0,"11:00:00",Direction.up,1)],27.50991,-107.84014,"",626,1,210/w1,212/h1),
      new TrainStop(24,"SAN RAFAEL",[new Departure(1,1,0,"19:00:00",Direction.down,1),new Departure(1,1,0,"12:00:00",Direction.up,1)],27.48831,-107.88949,"",636,1,209/w1,218/h1),
      new TrainStop(25,"CUITECO",[new Departure(1,1,0,"18:00:00",Direction.down,1),new Departure(1,1,0,"13:00:00",Direction.up,1)],27.4397,-108.02283,"",662,1,204/w1,225/h1),
      new TrainStop(26,"BAHUICHIVO",[new Departure(1,1,0,"17:00:00",Direction.down,1),new Departure(1,1,0,"14:00:00",Direction.up,1)],27.40669,-108.07234,"",669,1,194/w1,232/h1),
      new TrainStop(30,"TEMORIS",[new Departure(1,1,0,"16:40:00",Direction.down,1),new Departure(1,1,0,"14:20:00",Direction.up,1)],27.2551,-108.25694,"",708,1,163/w1,278/h1),
      new TrainStop(39,"EL FUERTE",[new Departure(1,1,0,"16:20:00",Direction.down,1),new Departure(1,1,0,"14:40:00",Direction.up,1)],26.3645,-108.59235,"",839,1,101/w1,410/h1),
      new TrainStop(42,"LOS MOCHIS",[new Departure(1,1,0,"16:00:00",Direction.down,1),new Departure(1,1,0,"15:00:00",Direction.up,1)],25.75877,-108.96825,"",921,1,37/w1,518/h1)];
    rregional.wagons = [
      this.mkWagon(wt1),
      this.mkWagon(wt1),
      this.mkWagon(wt2),
      this.mkWagon(wt2),
      this.mkWagon(wt2),
      this.mkWagon(wt2)];
    rregional.img_url = "assets/img/reservacion/header-reserva-regional.jpg";
    rregional.img_map="assets/img/reservacion/map_regional.jpg";
    rregional.img_map_full="assets/img/reservacion/map_regional_full_select.jpg";
    //response
    var response:Response<Route2[]> = new Response<Route2[]>("+RCH.WS12.0",null,[rexpress,rregional]);
    this.get_routes = response;
    return Observable.of(response);
    //return response;
  }
  wid:number = 1;
  sid:number = 1;
  mkWagon(wt:WagonType,rows:number=15):Wagon{
    var w:Wagon = new Wagon(1,wt,""+this.wid,[],1);
    for(var i=0;i<rows;i++){
      if(wt.id == 3){
        w.seats.push(new Seat(this.sid++,w.id,String.fromCharCode("A".charCodeAt(0)+Math.floor(i/2))+((i%2==0)?1:4+1),this.rss(),i,0));
        w.seats.push(new Seat(this.sid++,w.id,String.fromCharCode("A".charCodeAt(0)+Math.floor(i/2))+((i%2==0)?2:4+2),this.rss(),i,1));
        w.seats.push(new Seat(this.sid++,w.id,String.fromCharCode("A".charCodeAt(0)+Math.floor(i/2))+((i%2==0)?3:4+3),this.rss(),i,2));
        w.seats.push(new Seat(this.sid++,w.id,String.fromCharCode("A".charCodeAt(0)+Math.floor(i/2))+((i%2==0)?4:4+4),this.rss(),i,3));
      }else{
        w.seats.push(new Seat(this.sid++,w.id,String.fromCharCode("A".charCodeAt(0)+i)+((true)?1:4+1),this.rss(),i,0));
        w.seats.push(new Seat(this.sid++,w.id,String.fromCharCode("A".charCodeAt(0)+i)+((true)?2:4+2),this.rss(),i,1));
        w.seats.push(new Seat(this.sid++,w.id,String.fromCharCode("A".charCodeAt(0)+i)+((true)?3:4+3),this.rss(),i,2));
        w.seats.push(new Seat(this.sid++,w.id,String.fromCharCode("A".charCodeAt(0)+i)+((true)?4:4+4),this.rss(),i,3));
      }
    }
    this.wid++;
    return w;
  }
  createIntent(type:string):Observable<Response<Intent>>{
    let intent:Intent = new Intent("xyz");
    return Observable.of(new Response("+RCH.WS2.0",null,intent));
  }
  createSession():Observable<Response<SessionToken>>{
    let st:SessionToken = new SessionToken("abc");
    return Observable.of(new Response("+RCH.WS3.0",null,st));
  }
  getStatus():Observable<Response<boolean>>{
    return Observable.of(new Response("+RCH.WS1.0",null,true));
  }
  private get_route_schedule_available={};
  private travels={};
  getRouteScheduleAvailable(id:number,query:AvailabilityQuery):Observable<Response<Schedule>>{
    //if(this.get_route_schedule_available[id]){return this.get_route_schedule_available[id];}
    var schedule:Schedule = new Schedule();
    schedule.query = query;
    schedule.travels = [];
    schedule.cost = Math.random()*20000;

    let routes:Route2[] = this.get_routes.data;//this.getRoutes().data;
    var route:Route2 = routes[0];
    for(var i=0;i<routes.length;i++){
      let r:Route2 = routes[i];
      if(r.id == id){
        route = r;
        break;
      }
    }
    var minkm:number = 0;
    var maxkm:number = 999999;var trs:TrainStop[] = [];
    for(var i=0;i<route.stops.length;i++){
      let ts:TrainStop = route.stops[i];
      trs.push(ts);
      if(ts.id == query.id_src){
        minkm = ts.km;
      }else if(ts.id == query.id_dst){
        maxkm = ts.km;
      }
    }
    
    if(minkm>maxkm){
      trs.reverse();
    }
    if(minkm > maxkm){
      let a = minkm;
      minkm = maxkm;
      maxkm = a;
    }
    var date:Date = new Date(query.start);
    var dateend:Date = new Date(query.end);
    let day:number = 1000*60*60*24;

    

    for(var i=0;i<(trs.length-1);i++){
      let ts0:TrainStop = trs[i];
      let ts1:TrainStop = trs[i+1];
      if(ts0.km < minkm || ts0.km> maxkm || ts1.km < minkm || ts1.km > maxkm){
        continue;
      }
      let direction:number = route.getDirection(ts0,ts1);
      let t:Travel = new Travel(schedule.travels.length+1,ts0.id,ts1.id,ts0.getDeparture(direction),ts1.getDeparture(direction),route.wagons,date.toString());
      let t2:Travel = new Travel(schedule.travels.length+2,ts0.id,ts1.id,ts0.getDeparture(direction),ts1.getDeparture(direction),route.wagons,this.dateAddTime(date,day).toString());
      let t3:Travel = new Travel(schedule.travels.length+3,ts0.id,ts1.id,ts0.getDeparture(direction),ts1.getDeparture(direction),route.wagons,this.dateAddTime(date,day*2).toString());
      this.travels[t.id] =t;
      this.travels[t2.id] =t2;
      this.travels[t3.id] =t3;
      schedule.travels.push(t,t2,t3);
      var lastdt:Date = this.dateAddTime(new Date(t3.date),day);
      var j=0;
      while(lastdt.getTime()<dateend.getTime() && j<30){
        let tt:Travel = new Travel(schedule.travels.length+1,ts0.id,ts1.id,ts0.getDeparture(direction),ts1.getDeparture(direction),route.wagons,lastdt.toString());
        schedule.travels.push(tt);
        this.travels[tt.id]=tt;
        lastdt = new Date(lastdt.getTime()+day);
        j++;
      }
      
      if(query.stops.indexOf(ts1.id) != -1){
        date = this.dateAddTime(date,day);
      }
    }
    
    this.get_route_schedule_available[id] = new Response("+RCH.WS13.0",null,schedule);
    return Observable.of(this.get_route_schedule_available[id]);
  }
  dateAddTime(d:Date,time:number):Date{
    var tt:number = d.getTime();
    tt+=time;
    let d2:Date = new Date(tt);
    return d2;
  }
  saveRouteBooking(b:RouteBooking):Observable<Response<RouteBooking>>{
    var rb:RouteBooking = b;
    rb.status = Math.floor(Math.random()*5);;
    
    for(var i=0;i<b.seats.length;i++){
      let sb:SeatBooking = b.seats[i];
      sb.seat.status = this.rss();
      sb.cost = new Cost();
      sb.cost.currency = this.getRandomCurrency();
      sb.cost.amount = Math.random()*1000;
    }
    var response:Response<RouteBooking> = new Response<RouteBooking>("+RCH.WS14.0",null,rb);
    return Observable.of(response);
  }  
  getWebPayUrl(b:RouteBooking):Observable<Response<WebPay>>{    
    var wp:WebPay = new WebPay();
    wp.descripcion = "";
    wp.estatus = "";
    var ref:Referencia = new Referencia();
    ref.id = "12345";
    ref.liga = "http://wpp.sandbox.mit.com.mx/i/5RA7JKMS"
    wp.referencia = ref;
    var response:Response<WebPay> = new Response<WebPay>("+RCH.WS14.0",null,wp);
    return Observable.of(response);
  }
  getRandomCurrency():string{
    let r:number = Math.floor(Math.random()*3);
    switch(r){
      case 0:
      default:
      return "MXN";
      case 1:
      return "USD";
      case 2:
      return "CAD";
    }
  }
  getTravel(id:number,id_src:number,id_dst:number):Observable<Response<Travel>>{
    if(this.travels[id]){return Observable.of(new Response("+RCH.WS15.0",null,this.travels[id]));}
    return null;
  }
  getCountries():Observable<Response<Country[]>>{
    let c : Country[] = [];
    return Observable.of(new Response("+RCH.WS1.0",null, c));
  }
  // getPaymentUrl(amount:number,mail:string):Observable<Response<UrlWebPay>>{
  //   return Observable.of(new Response<UrlWebPay>("+RCH.WS17.0",null,new UrlWebPay("http://wpp.sandbox.mit.com.mx/i/5RA7JKMS")));
  // }

}
