import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { SessionService } from '../../session.service';
import { BrowserModule }  from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Schedule } from '../../model/schedule';
import { Segment } from '../../model/segment';
import { Response } from '../../model/response';
import { TrainStop } from '../../model/trainstop';
import { Travel } from '../../model/travel';
import { AvailabilityQuery } from '../../model/availabilityquery';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  constructor(private location:Location, 
    private model:ModelService, 
    public session:SessionService) { }

    public schedule:Schedule = null;
    public segments:Segment[] = [];
  ngOnInit() {
    this.session.save();
    let query:AvailabilityQuery = this.session.query.toAvailabilityQuery(this.session.route);
    let response:Response<Schedule> = this.model.getRouteScheduleAvailable(this.session.route.id,query);
    if(response.success && response.data.travels.length>0){
      this.schedule = response.data;
      this.segments = this.makeSegments(this.schedule,query);
      
    }else{
      alert("No se lograron obtener opciones de viaje, elija otras opciones de búsqueda e inténtelo de nuevo");
      this.schedule = new Schedule();
    }
  }
  goBack(): void {
    this.location.back();
  }
  makeSegments(schedule:Schedule,query:AvailabilityQuery):Segment[]{
    var segments:Segment[] = [];
    var segments_by_ts={};
    for(var i=0;i<(this.session.route.stops.length-1);i++){
      let ts0:TrainStop = this.session.route.stops[i];
      let ts1:TrainStop = this.session.route.stops[i+1];
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
    console.log(segments);
    return segments;
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

}
