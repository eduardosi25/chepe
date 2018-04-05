import { Component, OnInit } from '@angular/core';
import { Route } from '../../model/route';
import { ModelService } from '../../model.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  constructor(private activated_route:ActivatedRoute, private location:Location, private model:ModelService) { }

  public route:Route = null;
  ngOnInit() {
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

}
