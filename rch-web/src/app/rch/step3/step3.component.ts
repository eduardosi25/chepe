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
import { query } from '@angular/core/src/animation/dsl';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  constructor(private location: Location,
    private model: ModelService,
    public session: SessionService,
    private router: Router,
    private aroute: ActivatedRoute) { }

  public segments: Segment[] = [];
  public schedule: Schedule = null;
  ngOnInit() {
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
        } else {
          alert("No se lograron obtener opciones de viaje, elija otras opciones de búsqueda e inténtelo de nuevo");
          this.schedule = new Schedule();
          this.session.schedule = null;
        }
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
  public onTravelSelected(segment: Segment, travel: Travel) {
    segment.selected_travel = travel;
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
            var aq: AvailabilityQuery2 = new AvailabilityQuery2(this.model);
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
    // console.log(segments2);
    
    return segments2;
  }
  public isFirstSegment(segment: Segment): boolean {
    return (segment.n == 1);
  }
  public isLastSegment(segment: Segment): boolean {
    return (segment.n == this.segments.length);
  }


}
