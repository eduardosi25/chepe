import { Component, OnInit } from '@angular/core';
import { Route } from '../../model/route';
import { ModelService } from '../../model.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TrainStop } from '../../model/trainstop';
import { SessionService } from '../../session.service';
import { AvailabilityQuery2 } from '../../model/availabilityquery2';
import { PassengerType } from '../../model/passengertype';
import { DomSanitizer } from '@angular/platform-browser';
import { Direction } from '../../model/direction';
declare var $: any;
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  constructor(private activated_route:ActivatedRoute, 
    private location:Location, 
    private model:ModelService, 
    public session:SessionService,
    private sanitizer: DomSanitizer) { }

  public route:Route = null;
  ngOnInit() {
    
    this.session.query = new AvailabilityQuery2();
    let route_name = this.activated_route.snapshot.paramMap.get('route_name');
    let routes:Route[] = this.model.getRoutes().data;
    for(var i=0;i<routes.length;i++){
      let route = routes[i];
      if(route.name == route_name){
        this.route = route;
        break;
      }
    }
  }
  public getRouteStops():TrainStop[]{
    var tss:TrainStop[] = [];
    if(this.session.query.src == null || this.session.query.dst == null){return tss;}
    let src:TrainStop = this.session.query.src;
    let dst:TrainStop = this.session.query.dst;
    let direction:number = src.km < dst.km ? Direction.up : Direction.down;

    for(var i=0;i<this.route.stops.length;i++){
      let ts:TrainStop = this.route.stops[i];
      if(ts == src || ts == dst){continue;}
      if(direction == Direction.up && ts.km>src.km && ts.km < dst.km){tss.push(ts);}
      if(direction == Direction.down && ts.km<src.km && ts.km > dst.km){tss.push(ts);}
    }

    return tss;
  }
  public getSrcs(direction:number=Direction.up):TrainStop[]{
    return this.route.getSrcs(direction);
  }
  public getDsts(direction:number=Direction.up,src:TrainStop=null):TrainStop[]{
    return src == null ? this.getSrcs(direction):this.route.getDsts(direction,src.id);
  }
  public readyToGoNext():boolean{
    console.log(this.session.query);
    if(this.session.query.dst == null){return false;}
    if(this.session.query.src == null){return false;}
    var start_dt:Date = new Date(this.session.query.start);
    var end_dt:Date = new Date(this.session.query.end);
    var now_dt:Date = new Date();
    var nstops = 0;
    for(var i in this.session.query.stops){
      if(this.session.query.stops[i]){nstops++;}
    }
    var min_end_dt:Date = new Date(start_dt.getTime()+(nstops*1000*60*60*24));
    if(start_dt.getTime() < now_dt.getTime()){return false;}
    if(end_dt.getTime() < now_dt.getTime() || end_dt.getTime() < min_end_dt.getTime()){return false;}
    if(this.session.query.getTotalPassengers()<=0){return false;}
    return true;
  }
  public add(pt:PassengerType,d:number){
    var a = this.session.query.passengers[pt.id];
    a+=d;
    a = a<pt.min ? pt.min : a;
    a = a>pt.max ? pt.max : a;
    this.session.query.passengers[pt.id] = a;
  }
  public getTotalPassengers():string{
    var pps:string[] = [];
    for(var i=0;i<this.route.passenger_types.length;i++){
      let pt:PassengerType = this.route.passenger_types[i];
      let q:number = this.session.query.passengers[pt.id];
      if(q > 0){
        pps.push(pt.name+": "+q);
      }
    }
    return pps.join(", ");
  }
  public getCoordinates(ts:TrainStop){
    let map={
      x0:26.319957,
      y0:-106.379820,
      x1:29.835939,
      y1:-111.068201
    }
    let xdif:number = map.x1-map.x0;
    let ydif:number = map.y1-map.y0;
    var px:number = (ts.latitude-map.x0)/xdif;
    var py:number = (ts.longitude-map.y0)/ydif;
    let styles:string = "left:"+(px*100)+"%;top:"+(py*100)+"%;";

    return this.sanitizer.bypassSecurityTrustStyle(styles);
  }
  public canSelectMap():boolean{
    return (this.session.query.src != null  && this.session.query.dst != null);
  }
  public onMap(){
    if(this.canSelectMap()){
      $('#map-stops').modal('show');
    }else{
      alert("Debes elegir un origen y un destino");
    }
    
  }
  
}
