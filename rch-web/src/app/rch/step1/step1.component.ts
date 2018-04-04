import { Component, OnInit } from '@angular/core';
import { Route } from '../../model/route';
import { ModelService } from '../../model.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TrainStop } from '../../model/trainstop';
import { SessionService } from '../../session.service';
import { AvailabilityQuery2 } from '../../model/availabilityquery2';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  constructor(private activated_route:ActivatedRoute, private location:Location, private model:ModelService, public session:SessionService) { }

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

    let src:TrainStop = this.session.query.src;
    let dst:TrainStop = this.session.query.dst;
    let direction:number = src.km < dst.km ? 0 : 1;

    for(var i=0;i<this.route.stops.length;i++){
      let ts:TrainStop = this.route.stops[i];
      if(ts == src || ts == dst){continue;}
      if(direction == 0 && ts.km>src.km && ts.km < dst.km){tss.push(ts);}
      if(direction == 1 && ts.km<src.km && ts.km > dst.km){tss.push(ts);}
    }

    return tss;
  }

}
