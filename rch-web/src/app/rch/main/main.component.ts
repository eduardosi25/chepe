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
  ngOnInit() {
    var r:Response<Route[]> = this.model.getRoutes();
    if(r.success){
      this.routes = r.data;
      console.log(this.routes);
    }else{
      alert(r.status.toString());
    }
  }
  getRouteWagonTypes(route:Route){
    var wts = [];
    for(var i=0;i<route.wagons.length;i++){
      let wagon:Wagon = route.wagons[i];
      let wt:WagonType = wagon.type;
      if(wts.indexOf(wt) == -1){
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
