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
import { RouteBooking } from '../../model/routebooking';
import { Person } from '../../model/person';
import { Wagon } from '../../model/wagon';
import { WagonType } from '../../model/wagontype';
import { Seat } from '../../model/seat';
import { SeatBooking } from '../../model/seatbooking';
declare var $: any;
@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  constructor(private location:Location, 
    private model:ModelService, 
    public session:SessionService,
    private router:Router) { }
    public selected_segment:Segment = null;
    public selected_wagon_type:WagonType = null;
    public segments:Segment[] = [];
  ngOnInit() {
    if(!this.session || !this.session.route ||  !this.session.query || !this.session.segments || !this.session.rb){
      this.router.navigate(["/reservaciones"]);return;
    }
    this.segments = this.session.mkUnifiedSegments();
    if(this.session && this.segments && this.segments.length>0){
      this.setSelectedSegment(this.segments[0]);
    }else{
      alert("No se detectaron viajes elegidos en la selección de itinerario, por favor, vuelva a hacer su selección.");
      this.router.navigate(["/reservaciones"]);
    }
  }
  goBack(): void {
    this.location.back();
  }
  isFirstSegment(segment:Segment):boolean{
    return (segment.n <= 1);
  }
  
  isLastSegment(segment:Segment):boolean{
    return (this.segments.length == segment.n);
  }
  setSelectedSegment(segment:Segment){
    let travel0:Travel = segment.selected_travel;
    this.model.getTravel(travel0.id,travel0.id_src,travel0.id_dst).subscribe((response:Response<Travel>)=>{
      for(var i=0;i<segment.travels.length;i++){
        let tt:Travel = segment.travels[i];
        if(tt.id == response.data.id && tt.id_src == response.data.id_src && tt.id_dst == response.data.id_dst){
          segment.travels[i] = response.data;
          break;  
        }
      }
      this.selected_segment = segment;
      this.selected_segment.selected_travel = response.data;
      if(this.selected_segment.sbs == null){
        this.selected_segment.sbs = [];
        let j:number = this.segments.indexOf(segment);
        if(j > 0){
          //this.prePickSeats(segment,this.segments[i]);
        }
      }
      window.scrollTo(0, 0)
    });
  }
  prePickSeats(segment:Segment,base:Segment){
    for(var i=0;i<base.sbs.length;i++){
      let sb:SeatBooking = base.sbs[i];
      let sbwname = sb.wagon.name;
      for(var j=0;j<segment.selected_travel.wagons.length;j++){
        let w:Wagon = segment.selected_travel.wagons[j];
        if(w.name == sbwname){
          let s:Seat = w.getSeat(sb.seat.row,sb.seat.col);
          if(s != null){
            this.onSeatClicked(s,w,segment);
          }
        }
      }
    }
  }
  selectWagonType(wt:WagonType){
    this.selected_wagon_type = wt;
  }

  public auto_pick_wagon:boolean = true;
  getWagons(segment:Segment):Wagon[]{
    if(this.auto_pick_wagon && segment != this.segments[0]){
      if(this.segments[0].selected_wagon){
        var wagons:Wagon[] = [];
        let wt:WagonType = this.segments[0].selected_wagon.type;
        for(var i=0;i<segment.selected_travel.wagons.length;i++){
          let w:Wagon = segment.selected_travel.wagons[i];
          if(w.type.id = wt.id){
            wagons.push(w);
          }
        }
        return this.filterWagons(wagons);
      }else{
        return this.filterWagons(segment.selected_travel.wagons);
      }
    }else{
      return this.filterWagons(segment.selected_travel.wagons);
    }
  }
  filterWagons(wagons:Wagon[]):Wagon[]{
    if(this.session.route.pick_class && this.session.query.class != null){
      return this.filterWagonsByWagonType(wagons,this.session.query.class);
    }
    return wagons;
  }
  filterWagonsByWagonType(wagons:Wagon[],wt:WagonType):Wagon[]{
    var wagons2:Wagon[] = [];
    for(var i=0;i<wagons.length;i++){
      let wagon:Wagon = wagons[i];
      if(wagon.type.id == wt.id){
        wagons2.push(wagon);
      }
    }
    return wagons2;
  }
  getRemainingSbs():number{
    let remaining:number = this.session.query.getTotalPassengers()-this.selected_segment.sbs.length;
    return remaining;
  }
  getAssignedSbs():number{
    let remaining:number = this.getRemainingSbs();
    if(remaining > 0){
      $('assigned-passengers').addClass('orange');
    }else{
      $('assigned-passengers').removeClass('orange');
    }
    return this.selected_segment.sbs.length;
  }
  onSeatClicked(seat:Seat,wagon:Wagon,segment:Segment){
    
    let remaining:number = this.getRemainingSbs();
    
    switch(seat.status){
      case Seat.available:
        if(remaining <= 0){
          alert("Ya has asignado a todos los pasajeros disponibles. Puedes hacer clic sobre un asiento seleccionado para quitar esa selección y así volver a asignar al pasajero, o bien, elige otra escala para seguir seleccionando asientos.");
          return;
        }
        seat.status=Seat.taken;
        var sb:SeatBooking = new SeatBooking(seat,wagon,
          segment.selected_travel,this.session.route,
          segment.getNextPT(this.session.route,this.session.query),
          null);
        segment.sbs.push(sb);
        break;
      case Seat.unavailable:seat.status=Seat.unavailable;break;
      case Seat.taken:
        seat.status=Seat.available;
        for(var i=0;i<segment.sbs.length;i++){
          let sb:SeatBooking = segment.sbs[i];
          if(sb.seat.id == seat.id){
            segment.sbs.splice(i,1);
            break;
          }
        }
        break;
      case Seat.booked:seat.status=Seat.booked;break;
    }
  }
  isFirstNav():boolean{
    let i:number = this.segments.indexOf(this.selected_segment);
    return (i == 0);
  }
  isLastNav():boolean{
    let i:number = this.segments.indexOf(this.selected_segment);
    return (i==(this.segments.length-1));
  }
  onNext(){
    let i:number = this.segments.indexOf(this.selected_segment);
    if(i==(this.segments.length-1)){
      if(confirm("¿Ha terminado de seleccionar los asientos de los pasajeros?")){
        this.session.rb.seats = [];
        for(var j=0;j<this.segments.length;j++){
          let s:Segment = this.segments[j];
          for(var k=0;k<s.sbs.length;k++){
            let sb:SeatBooking = s.sbs[k];
            this.session.rb.seats.push(sb);
          }
        }
        this.router.navigate(["/reservaciones/"+this.session.route.name+"/confirmar"]);
      }
    }else{
      let r:number = this.getRemainingSbs();
      if(r > 0){
        alert("Aun debe elegir "+r+" asientos más.");
      }else{
        this.setSelectedSegment(this.segments[i+1]);
      }
    }
  }
  onBack(){
    let i:number = this.segments.indexOf(this.selected_segment);
    if(i==0){
      if(confirm("¿Desea regresar a la pantalla anterior?")){
        this.router.navigate(["/reservaciones/"+this.session.route.name+"/paso4"]);
      }
    }else{
      this.setSelectedSegment(this.segments[i-1]);
    }
  }
  fly_max:number = -1;
  public shouldFly():boolean{
    return false;
    /*  this.fly_max = document.body.clientHeight-screen.height;
    
    let a = document.scrollingElement || document.body;
    if(a.scrollTop > this.fly_max){
      return false;
    }else{
      return true;
    }*/
  }
}
