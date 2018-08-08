import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { Response } from '../../model/response';
import { Wagon } from '../../model/wagon';
import { WagonType } from '../../model/wagontype';
import { Route2 } from '../../model/route2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private model:ModelService) { 

  }

  routes:Route2[] = [];
  public loading:boolean = false;
  public selected_route:Route2 = null;
  ngOnInit() {
    this.loading = true;
    this.model.getRoutes().subscribe((r:Response<Route2[]>)=>{
      this.loading = false;
      if(r.success){
        this.routes = r.data;
      }else{
        alert(r.status.toString());
      }
    },(r)=>{
      this.loading = false;
      this.routes = [];
    });
  }
  public noRoutes(){
    return (!this.loading && (!this.routes || this.routes.length<=0));
  }
  public selectRoute(route:Route2){
    this.selected_route = route;
  }
  getRouteWagonTypes(route:Route2){
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
  isRegional(route:Route2):boolean{
    return (route.name.toLowerCase() == "chepe regional");
  }

}
