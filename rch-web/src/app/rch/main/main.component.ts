import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { Route } from '../../model/route';
import { Response } from '../../model/response';
import { Wagon } from '../../model/wagon';
import { WagonType } from '../../model/wagontype';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private model:ModelService) {

  }

  routes:Route[] = [];
  public selected_route:Route = null;
  ngOnInit() {
    this.model.getRoutes().subscribe((r:Response<Route[]>)=>{
      if(r.success){
        this.routes = r.data;
      }else{
        alert(r.status.toString());
      }
    });
  }
  public selectRoute(route:Route){
    this.selected_route = route;
  }
  getRouteWagonTypes(route:Route){
    var wts = [];var wtnames:number[] = [];
    for(var i=0;i<route.wagons.length;i++){
      let wagon:Wagon = route.wagons[i];
      let wt:WagonType = wagon.type;
      if(wtnames.indexOf(wt.id) == -1){
        wtnames.push(wt.id);
        wts.push(wt);
      }
    }
    var str = "";
    for(var i=0;i<wts.length;i++){
      let wt:WagonType = wts[i];
      if(i==0){
        str = wt.name;
      }else{
        if( (i+1) == wts.length){
          str+=" y "+wt.name;
        }else{
          str+=", "+wt.name;
        }
      }
    }
    return str;
  }

}
