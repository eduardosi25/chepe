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
        //this.session.schedule2 = response.data;
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
    query.start = this.session.segments[this.session.segments.length-1].selected_travel.getArrivalDateTime();
    return query;
  }

}
