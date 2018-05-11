import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { SessionService } from '../../session.service';
import { BrowserModule }  from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Schedule } from '../../model/schedule';
import { Segment } from '../../model/segment';
import { Response } from '../../model/response';
import { TrainStop } from '../../model/trainstop';
import { Travel } from '../../model/travel';
import { AvailabilityQuery } from '../../model/availabilityquery';
import { Direction } from '../../model/direction';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  constructor(private location:Location, 
    private model:ModelService, 
    public session:SessionService,
  private router:Router) { }

    public schedule:Schedule = null;
    public segments:Segment[] = [];
  ngOnInit() {
    if(!this.session || !this.session.query || !this.session.route){
      this.router.navigate(["/reservaciones/"]);return;
    }
    this.session.save();
    let query:AvailabilityQuery = this.session.query.toAvailabilityQuery(this.session.route);
    this.model.getRouteScheduleAvailable(this.session.route.id,query).subscribe((response:Response<Schedule>)=>{
      if(response.success && response.data.travels.length>0){
        this.schedule = response.data;
        this.segments = this.makeSegments(this.schedule,query);
        this.session.segments = this.segments;
      }else{
        alert("No se lograron obtener opciones de viaje, elija otras opciones de búsqueda e inténtelo de nuevo");
        this.schedule = new Schedule();
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
  makeSegments(schedule:Schedule,query:AvailabilityQuery):Segment[]{
    var segments:Segment[] = [];
    var segments_by_ts={};

    var routets:TrainStop[] = [];
    var direction = Direction.up;
    var fromkm = 0;var tokm=0;
    for(var i=0;i<this.session.route.stops.length;i++){
      let ts:TrainStop = this.session.route.stops[i];
      if(ts.id == query.id_src){
        fromkm = ts.km;
      }
      if(ts.id == query.id_dst){
        tokm = ts.km;
      }
      routets.push(ts);
    }
    if(fromkm > tokm){
      routets.reverse();
    }


    for(var i=0;i<(routets.length-1);i++){
      let ts0:TrainStop = routets[i];
      let ts1:TrainStop = routets[i+1];
      var segment:Segment = new Segment(i+1,ts0,ts1,[],query);
      segments_by_ts[ts0.id] = segment;
      if(i>0){
        let prev:Segment = segments[i-1];
        segment.previous = prev;
      }
      segments.push(segment);
    }
    for(var i=0;i<schedule.travels.length;i++){
      let t:Travel = schedule.travels[i];
      let segment:Segment = segments_by_ts[t.id_src];
      if(segment == null){continue;}
      segment.travels.push(t);
    }
    var k = 1;
    var segments2:Segment[] =  [];
    for(var j=0;j<segments.length;j++){
      let s:Segment = segments[j];
      if(s.travels.length>0){
        s.n = k++;
        s.previous = segments2.length>0 ? segments2[segments2.length-1]:null;
        segments2.push(s);
      }
    }
    return segments2;
  }
  public onTravelSelected(segment:Segment,travel:Travel){
    segment.selected_travel = travel;
  }
  public canContinueNext(){
    for(var i=0;i<this.segments.length;i++){
      let s:Segment = this.segments[i];
      if(s.selected_travel == null){
        return false;
      }
    }
    return true;
  }
  public isStop(ts:TrainStop){
    return (this.session.query.stops[ts.id]);
  }
  public getSegmentTravels(segment:Segment):Travel[]{
    let gral_max:Date = new Date(this.session.query.end);
    gral_max.setHours(23);
    gral_max.setMinutes(59);
    gral_max.setSeconds(59);
    let ts:Travel[] = segment.getTravels2(gral_max,this.segments);
    if(ts.length==1){
      
      //  segment.selected_travel = ts[0];
      
    }
    return ts;
  }

}
