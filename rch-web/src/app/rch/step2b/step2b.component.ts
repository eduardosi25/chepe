import { Component, OnInit } from '@angular/core';
import { Step2Component } from '../step2/step2.component';
import { AvailabilityQuery } from '../../model/availabilityquery';
import { Response } from '../../model/response';
import { Schedule } from '../../model/schedule';

@Component({
  selector: 'app-step2b',
  templateUrl: './step2b.component.html',
  styleUrls: ['./step2b.component.css']
})
export class Step2bComponent extends Step2Component implements OnInit{


  ngOnInit() {
    if(!this.session || !this.session.query || !this.session.route){
      this.router.navigate(["/reservaciones/"]);return;
    }
    this.session.save();
    var query:AvailabilityQuery = this.session.query.toAvailabilityQuery(this.session.route);

    query = this.fixQuery(query);

    this.model.getRouteScheduleAvailable(this.session.route.id,query).subscribe((response:Response<Schedule>)=>{
      if(response.success && response.data.travels.length>0){
        this.schedule = response.data;
        this.session.schedule = response.data;
        this.segments = this.makeSegments(this.schedule,query);
        this.session.segments2 = this.segments;
        
      }else{
        alert("No se lograron obtener opciones de viaje, elija otras opciones de búsqueda e inténtelo de nuevo");
        this.schedule = new Schedule();
        this.session.schedule = null;
      }
    });
  }
  fixQuery(query:AvailabilityQuery):AvailabilityQuery{
    let src = query.id_src;
    query.id_src = query.id_dst;
    query.id_dst = src;
    query.start = this.mkDate( this.session.segments[this.session.segments.length-1].selected_travel.getArrivalDateTime()).toString();    
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
}
