import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { SessionService } from '../../session.service';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Schedule } from '../../model/schedule';
import { Segment } from '../../model/segment';
import { Response } from '../../model/response';
import { TrainStop } from '../../model/trainstop';
import { Travel } from '../../model/travel';
import { AvailabilityQuery } from '../../model/availabilityquery';
import { Direction } from '../../model/direction';
import { AvailabilityQuery2 } from '../../model/availabilityquery2';
import { Route2 } from '../../model/route2';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { query } from '@angular/core/src/animation/dsl';
import { forEach } from '@angular/router/src/utils/collection';
import { setTimeout } from 'timers';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  constructor(private location: Location,
    private translate: TranslateService,
    private model: ModelService,
    public session: SessionService,
    private router: Router,
    private aroute: ActivatedRoute) { }

  public segments: Segment[] = [];
  public schedule: Schedule = null;
  public dateWeek; 
  public  btnNext= true;
  public displayModal = false;
  public notifTitle = "";
  public notifBody = "";
  public notifBody1 = "";
  public notifBody2 = "";
  public notifBody3 = "";
  public notifBody11="";
  public isLoading = true;
  ngOnInit() {
    this
    this.checkQueryString().subscribe((r: boolean) => {
      if (!this.session || !this.session.query || !this.session.route) {
        this.router.navigate(["/reservaciones/"]); return;
      }
      this.session.save();
      let query: AvailabilityQuery = this.session.query.toAvailabilityQuery(this.session.route);
      this.model.getRouteScheduleAvailable(this.session.route.id, query).subscribe((response: Response<Schedule>) => {
        
        if (response.success && response.data.travels.length > 0) {
          this.schedule = response.data;
          this.session.schedule = response.data;
          this.segments = this.makeSegments(this.schedule, query);
          this.session.segments = this.segments;
          
          this.segments.forEach(e => {
            this.onTravelSelected(e,e.travels[0])
          });
          
    
    
          /*************/          
         if(this.session.query.round)
          {
            
          let query2: AvailabilityQuery = this.session.query2.toAvailabilityQuery(this.session.route);
          query2 = this.fixQuery(query2);

          this.model.getRouteScheduleAvailable(this.session.route.id,query2).subscribe((response:Response<Schedule>)=>{
            if(response.success && response.data.travels.length>0){
              console.log("response sch");
              console.log(response.data);
              this.segments = this.makeSegments(response.data,query2);
              this.session.segments2 = this.segments;
              console.log(" segs");
              console.log(this.segments);
              
              this.segments.forEach(e => {
                this.onTravelSelected(e,e.travels[0])
            });
              this.router.navigate(["/reservaciones/" + this.session.route.name + "/paso4"]); return;
              // this.schedule = response.data;
              // this.session.schedule.travels. = response.data;
              // this.segments = this.makeSegments(this.schedule,query2);
              // this.session.segments2 = this.segments;
            }else{
              if (this.session.route.name == 'Express') {
                this.isLoading = false;
                this.displayModal = true;
                this.notifTitle = "No hay disponibilidad";
                this.notifBody = "Para un mejor servicio te sugerimos tomar en cuenta los siguientes puntos:";       
                this.notifBody1 = "Tener en cuenta los únicos días de salida del tren por semana. Para mas información da click " 
                this.notifBody11= "aquí"
                this.notifBody2 = "Si revisaste lo anterior y tus fechas son correctas es probable que la fecha que elegiste ya no está disponible de venta por falta de cupo, en este caso te recomendamos marcar al 01800 122 4373 para apoyarte en buscar nuevas fechas disponibles para armar tu viaje."
                this.notifBody3 = "Gracias por elegirnos!"
                // alert("No se encontraron asiento disponibles par su viaje, elija otras opciones de búsqueda e inténtelo de nuevo");                
              }
              else{
                this.displayModal = true;
                this.isLoading = false;
                this.notifTitle = "No hay viajes disponibles";
                this.notifBody = "Para un mejor servicio te sugerimos tomar en cuenta los siguientes puntos:";       
                this.notifBody1 = "Tener en cuenta los únicos días de salida del tren por semana. Para mas información da click " 
                this.notifBody11= "aquí"
                this.notifBody2 = "Si revisaste lo anterior y tus fechas son correctas es probable que la fecha que elegiste ya no está disponible de venta por falta de cupo, en este caso te recomendamos marcar al 01800 122 4373 para apoyarte en buscar nuevas fechas disponibles para armar tu viaje."
                this.notifBody3 = "Gracias por elegirnos!"
                  // alert("No se encontraron viajes disponibles, verifica los días de salida para tu trayecto");
              }
              this.schedule = new Schedule();
              this.session.schedule = null;
            }
          });
          }
          else{            
            //   this.segments.forEach(e => {
            //     this.onTravelSelected(e,e.travels[0])
            // });
            this.router.navigate(["/reservaciones/" + this.session.route.name + "/paso4"]); return;
          } 
          /*************/
        } else {
          // alert("No se lograron obtener opciones de viaje, elija otras opciones de búsqueda e inténtelo de nuevo");
              if (this.session.route.name == 'Express') {
                this.isLoading = false
                this.displayModal = true;
                this.notifTitle = "No hay disponibilidad";
                this.notifBody = "Para un mejor servicio te sugerimos tomar en cuenta los siguientes puntos:";       
                this.notifBody1 = "Tener en cuenta los únicos días de salida del tren por semana. Para mas información da click " 
                this.notifBody11= "aquí"
                this.notifBody2 = "Si revisaste lo anterior y tus fechas son correctas es probable que la fecha que elegiste ya no está disponible de venta por falta de cupo, en este caso te recomendamos marcar al 01800 122 4373 para apoyarte en buscar nuevas fechas disponibles para armar tu viaje."
                this.notifBody3 = "Gracias por elegirnos!"
                // alert("No se encontraron asiento disponibles par su viaje, elija otras opciones de búsqueda e inténtelo de nuevo");                
              }
              else{
                this.isLoading = false
                this.displayModal = true;
                this.notifTitle = "No hay disponibilidad";
                this.notifBody = "Para un mejor servicio te sugerimos tomar en cuenta los siguientes puntos:";       
                this.notifBody1 = "Tener en cuenta los únicos días de salida del tren por semana. Para mas información da click " 
                this.notifBody11= "aquí"
                this.notifBody2 = "Si revisaste lo anterior y tus fechas son correctas es probable que la fecha que elegiste ya no está disponible de venta por falta de cupo, en este caso te recomendamos marcar al 01800 122 4373 para apoyarte en buscar nuevas fechas disponibles para armar tu viaje."
                this.notifBody3 = "Gracias por elegirnos!"
                   // alert("No se encontraron viajes disponibles, verifica los días de salida para tu trayecto");
              }
          // this.schedule = new Schedule();
          // this.session.schedule = null;
        }
        // console.log("/reservaciones/" + this.session.route.name + "/paso");
        // this.router.navigate(["/reservaciones/" + this.session.route.name + "/paso4"]); return;
      });
    });
    this.segments = this.session.mkUnifiedSegments();
    this.session.segments = this.segments;
    if (!this.session || !this.session.query || !this.session.segments || !this.session.route) {
      this.router.navigate(["/reservaciones"]); return;
    }
  }

  private selectTrips() {
    
  } 
 
  
  fixQuery(query:AvailabilityQuery):AvailabilityQuery{
    // let src = query.id_src;
    // query.id_src = query.id_dst;
    // query.id_dst = src;
    // query.start = this.mkDate( this.session.segments[this.session.segments.length-1].selected_travel.getArrivalDateTime()).toString();    
    // console.log(query.start);
    return query;
  }
  
  mkDate(s:string):Date{
    var mps:string[] = s.split(" ");
    let now:Date = new Date();
    if(mps.length==1){
        mps.push("00:00:01");
    }
    let dps:string[] = mps[0].split("-");
    let tps:string[] = mps[1].split(":");

    let year:number  = dps.length>=1?parseInt(dps[0]):now.getFullYear();
    let month:number  = dps.length>=2?parseInt(dps[1])-1:now.getMonth();
    let day:number  = dps.length>=3?parseInt(dps[2]):now.getDate();

    let hour:number = tps.length>=1?parseInt(tps[0]):now.getHours();
    let minute:number = tps.length>=2?parseInt(tps[1]):now.getMinutes();
    let second:number = tps.length>=3?parseInt(tps[2]):now.getSeconds();

    let dd:Date = new Date(year,month,day+1,hour,minute,second);
    return dd;
  }
  public onTravelSelected(segment: Segment, travel: Travel) {
    segment.selected_travel = travel;
   
    for(var a = 0; a <= segment.n; a++){
       var d = segment.selected_travel.getWeekday()
       
        var dateWee = [d];

       if (dateWee[0] == "Jueves"){
       this.dateWeek = this.translate.instant('Step3-P16');
      }
    }
  }
  public lenguajeWeekDay(){


  }
  public getSegmentTravels(segment: Segment): Travel[] {
    let gral_max: Date = new Date();
    // gral_max.setHours(23);
    // gral_max.setMinutes(59);
    // gral_max.setSeconds(59);
     let ts: Travel[] = segment.getTravels2(gral_max, this.segments);
    // if (ts.length == 1) {

    //   //  segment.selected_travel = ts[0];

    //}
    return ts;
  }

  checkQueryString() {
    return new Observable<boolean>((observer) => {
      this.aroute.queryParams.subscribe((params) => {
        if (params.start && params.end && params.src && params.dst && params.round) {
          this.model.getRoutes().subscribe((r: Response<Route2[]>) => {
            let route_name = this.aroute.snapshot.paramMap.get('route_name');
            this.session.route = this.model.getRouteByName(route_name);
            var aq: AvailabilityQuery2 = new AvailabilityQuery2(this.model, this.translate);
            aq.class = params.class ? this.model.getWagonTypeById(params.class) : aq.class;
            // aq.src = this.model.getTrainStopById(params.src);
            // aq.dst = this.model.getTrainStopById(params.dst);
            aq.passengers = []; params.passengers;
            for (var i = 0; i < params.passengers.length; i++) {
              let aa: string = "" + params.passengers[i];
              let bb = parseInt(aa);
              if (aq.passengers.length < bb) {
                aq.passengers[bb] = 0;
              }
              aq.passengers[bb]++;
            }
            aq.round = (params.round == "true");
            // if (params.start == "today") {
            //   aq.start = (new Date()).toString();
            // } else {
            //   aq.start = params.start;
            // }
            var endn = Number.parseInt(params.end);
            // if (!isNaN(endn)) {
            //   var now: Date = new Date();
            //   aq.end = (new Date(now.getTime() + (1000 * 60 * 60 * 24 * endn))).toString();
            // } else {
            //   aq.end = params.end;
            // }

            // aq.stops = {};
            if (params.stops) {
              var aaa = params.stops;
              if (typeof (aaa) == 'string') {
                aaa = [aaa];
              }
              for (var i = 0; i < aaa.length; i++) {
                var bbb = aaa[i];
                let ccc = parseInt(bbb);
                let ts: TrainStop = this.model.getTrainStopById(ccc);
                // if (ts != null) {
                //   aq.stops[ts.id] = ts;
                // }
              }
            }
            this.session.query = aq;
            // console.log(aq);
            observer.next(true);
          })


        } else {
          observer.next(false);
        }
      });

    });
  }

  goBack(): void {
    this.location.back();
  }
  makeSegments(schedule: Schedule, query: AvailabilityQuery): Segment[] {
    var segments: Segment[] = [];
    var segments_by_ts = {};

    var routets: TrainStop[] = [];
    var routets01: TrainStop[] = [];
    var direction = Direction.up;
    var fromkm = 0; var tokm = 0;
    
    for (var i = 0; i < this.session.route.stops.length; i++) {
    //   let ts: TrainStop = this.session.route.stops[i];
    //   // console.log("ts id: " + ts.id + " id_src: " + query.id_src);
    //   if (ts.id == query.id_src) {
    //     fromkm = ts.km;
    //     routets.push(ts);
    //   }
    //   if (ts.id == query.id_dst) {
    //     tokm = ts.km;
    //     routets.push(ts);
    //   }
    // if (query.stops.toString().search(ts.id.toString()) >= 0)
    //   routets.push(ts);
    //   // console.log(routets);
    }   
    if (fromkm > tokm) {
      routets.reverse();
    }
    for (let i = 0; i < query.trips.length; i++) {
      const e = query.trips[i];
      let ts0: any = e.id_src;// this.model.getTrainStopById(e.id_src);    
      let ts1: any = e.id_dst;// this.model.getTrainStopById(e.id_dst);   
      
      var segment: Segment = new Segment(i+1, ts0, ts1, [], query);
      
      segments.push(segment);
    }
    for (var i = 0; i < (routets.length - 1); i++) {
      let ts0: TrainStop = routets[i];    
      let ts1: TrainStop = routets[i+1];
      var segment: Segment = new Segment(i+1, ts0, ts1, [], query);     
      //segments_by_ts[ts0.id] = segment;
      if (direction == 1) {        
        segments_by_ts[ts0.id] = segment;
      }
      else if (fromkm < tokm)
      {        
        segments_by_ts[ts1.id] = segment;
      }
      if (i > 0) {
        let prev: Segment = segments[i - 1];
        segment.previous = prev;
      }
      segments.push(segment);
    }
    for (var i = 0; i < schedule.travels.length; i++) {
      let t: Travel = schedule.travels[i];
      let segment = segments[i];
      //let segment: Segment;
      // if (direction == 1) {        
      //   segment = segments_by_ts[t.id_src];
      // }
      // else if (direction == 2)
      // {        
      //   segment = segments_by_ts[t.id_dst];
      // }
      if (segment == null) { continue; } 
      segment.travels.push(t);
    }
    var k = 1;
    var segments2: Segment[] = [];
    for (var j = 0; j < segments.length; j++) {
      let s: Segment = segments[j];
      if (s.travels.length > 0) {
        s.n = k++;
        s.previous = segments2.length > 0 ? segments2[segments2.length - 1] : null;
        segments2.push(s);
      }
    }
    
    this.btnNext=null;
    return segments2
  }
  public isFirstSegment(segment: Segment): boolean {
   
    return (segment.n == 1);
  }
  public isLastSegment(segment: Segment): boolean {
   
    return (segment.n == this.segments.length);
  }

}
