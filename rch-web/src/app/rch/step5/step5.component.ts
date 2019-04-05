import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { SessionService } from '../../session.service';
import { BrowserModule } from '@angular/platform-browser';
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
import { Cost } from '../../model/cost';
declare var $: any;
@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

  constructor(private location: Location,
    private model: ModelService,
    public session: SessionService,
    private router: Router) { }
    public selected_segment: Segment = null;
    public selected_wagon_type: WagonType = null;
    public segments: Segment[] = [];
    public displayModal = false;
    public displayModalReturn = false;
    public notifTitle = "";
    public notifBody = "";
    public notifBody1 = "";
    public isLoading = true;
    public route ;
    public routeX = "/reservaciones/" + this.session.route.name + "/paso5";
    public slickAlive:boolean = true;

  ngOnInit() {
    if (!this.session || !this.session.route || !this.session.query || !this.session.segments || !this.session.rb) {
      this.router.navigate(["/reservaciones"]); return;
    }
    this.segments = this.session.mkUnifiedSegments();
    if (this.session && this.segments && this.segments.length > 0) {
      console.log(this.session)
      this.setSelectedSegment(this.segments[0]);
    } else {
      alert("No se detectaron viajes elegidos en la selección de itinerario, por favor, vuelva a hacer su selección.");
      this.router.navigate(["/reservaciones"]);
    }
    setTimeout(function(){
      $(".js-wagon__slider").slick({
          infinite: false,
          slidesToShow: 1,
          slideToScroll: 1,
          dots: false,
          arrows: true,
          prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
          nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
      });
    }, 1500);
   
  }
  goBack(): void {
    this.location.back();
  }
  isFirstSegment(segment: Segment): boolean {
    return (segment.n <= 1);
  }

  isLastSegment(segment: Segment): boolean {
    return (this.segments.length == segment.n);
  }
  setSelectedSegment(segment: Segment) {
    let travel0: Travel = segment.selected_travel;
    if (segment.sbs != null){
      this.selected_segment = segment;
    }
    else{
      this.model.getTravel(travel0.id, travel0.id_src, travel0.id_dst, this.session.query.getTotalPassengers()).subscribe((response: Response<Travel>) => {
        for (var i = 0; i < segment.travels.length; i++) {
          let tt: Travel = segment.travels[i];
          if (tt.id == response.data.id && tt.id_src == response.data.id_src && tt.id_dst == response.data.id_dst) {
            segment.travels[i] = response.data;
            break;
          }
        }
        this.selected_segment = segment;
        this.selected_segment.selected_travel = response.data;
        if (this.selected_segment.sbs == null) {
          this.selected_segment.sbs = [];
          let j: number = this.segments.indexOf(segment);
          if (j > 0) {
            this.prePickSeats(segment,this.segments[i]);
          }
        }
        window.scrollTo(0, 0)
      });
    }
  }
  ocultarModel(){
    this.displayModal = false;
    this.displayModalReturn = false;
  }
  ocultarModelReturn(){
    let i: number = this.segments.indexOf(this.selected_segment);
    this.setSelectedSegment(this.segments[i - 1]);
    this.displayModalReturn = false;
  }
  prePickSeats(segment: Segment, base: Segment) {
    for (var i = 0; i < base.sbs.length; i++) {
      let sb: SeatBooking = base.sbs[i];
      let sbwname = sb.wagon.name;
      for (var j = 0; j < segment.selected_travel.wagons.length; j++) {
        let w: Wagon = segment.selected_travel.wagons[j];
        if (w.name == sbwname) {
          let s: Seat = w.getSeat(sb.seat.row, sb.seat.col);
          if (s != null) {
            this.onSeatClicked(s, w, segment,i);
          }
        }
      }
    }
  }
  selectWagonType(wt: WagonType) {
    this.selected_wagon_type = wt;
  }

  public auto_pick_wagon: boolean = true;
  getWagons(segment: Segment): Wagon[] {
    if (this.auto_pick_wagon && segment != this.segments[0]) {
      if (this.segments[0].selected_wagon) {
        var wagons: Wagon[] = [];
        let wt: WagonType = this.segments[0].selected_wagon.type;
        for (var i = 0; i < segment.selected_travel.wagons.length; i++) {
          let w: Wagon = segment.selected_travel.wagons[i];
          if (w.type.id = wt.id) {
            wagons.push(w);
          }
        }
        return this.filterWagons(wagons);
      } else {
        return this.filterWagons(segment.selected_travel.wagons);
      }
    } else {
      return this.filterWagons(segment.selected_travel.wagons);
    }
  }
  filterWagons(wagons: Wagon[]): Wagon[] {
    if (this.session.route.pick_class && this.session.query.class != null) {
      return this.filterWagonsByWagonType(wagons, this.session.query.class);
    }
    return wagons;
  }
  filterWagonsByWagonType(wagons: Wagon[], wt: WagonType): Wagon[] {
    var wagons2: Wagon[] = [];
    for (var i = 0; i < wagons.length; i++) {
      let wagon: Wagon = wagons[i];
      if (wagon.type.id_clase === wt.id) {
        wagons2.push(wagon);
      }
    }
    return wagons2;
  }
  getRemainingSbs(): number {
    let remaining: number = this.session.query.getTotalPassengers() - this.selected_segment.sbs.length;
    
    return remaining;
  }
  getAssignedSbs(): number {
    let remaining: number = this.getRemainingSbs();
    if (remaining > 0) {
      $('assigned-passengers').addClass('orange');
    } else {
      $('assigned-passengers').removeClass('orange');
    }
    return this.selected_segment.sbs.length;
  }
  onSeatClicked(seat: Seat, wagon: Wagon, segment: Segment, id_person: number) {
    
    let remaining: number = this.getRemainingSbs();
    switch (seat.status) {
      case Seat.available:
        if (remaining <= 0) {
        //  alert("Ya has asignado a todos los pasajeros disponibles. Puedes hacer clic sobre un asiento seleccionado para quitar esa selección y así volver a asignar al pasajero, o bien, elige otra escala para seguir seleccionando asientos.");
          this.isLoading = false
          this.displayModal = true;
          this.notifTitle = "";
          this.notifBody = "Ya has asignado a todos los pasajeros disponibles. Puedes hacer clic sobre un asiento seleccionado para quitar esa selección y así volver a asignar al pasajero, o bien, elige otra escala para seguir seleccionando asientos.";       
              this.route = this.routeX;
          return;
        }
        seat.status = Seat.taken;
        var sb: SeatBooking = new SeatBooking(seat, wagon,
          segment.selected_travel, this.session.route,
          segment.getNextPT(this.session.route, this.session.query),
          new Cost(), id_person,0);
        this.selected_segment.sbs.push(sb);    
        this.selected_segment = segment;
        break;
      case Seat.unavailable: seat.status = Seat.unavailable; break;
      case Seat.taken:
        seat.status = Seat.available;
        
        for (var i = 0; i < segment.sbs.length; i++) {
          let sb: SeatBooking = segment.sbs[i];
          if (sb.seat.id == seat.id) {
            segment.sbs.splice(i, 1);
            break;
          }
        }
        break;
      case Seat.booked: seat.status = Seat.booked; break;
    }
  }
  isFirstNav(): boolean {
    let i: number = this.segments.indexOf(this.selected_segment);
    return (i == 0);
  }
  isLastNav(): boolean {
    let i: number = this.segments.indexOf(this.selected_segment);
    return (i == (this.segments.length - 1));
  }
  onNext() {
    let i: number = this.segments.indexOf(this.selected_segment);
    let r: number = this.getRemainingSbs();
    if (i == (this.segments.length - 1) && r == 0) {
      //if (confirm("¿Ha terminado de seleccionar los asientos de los pasajeros?")) {
        this.isLoading = false
        this.displayModal = true;
        this.notifTitle = "";
        this.notifBody = "¿Ha terminado de seleccionar los asientos de los pasajeros?";       
        this.route = "/reservaciones/"+ this.session.route.name +"/confirmar";
       
       
        this.session.rb.seats = [];
        for (var j = 0; j < this.segments.length; j++) {
          let s: Segment = this.segments[j];
          for (var k = 0; k < s.sbs.length; k++) {
            let sb: SeatBooking = s.sbs[k];
            this.session.rb.seats.push(sb);
          }
        }
        //this.router.navigate(["/reservaciones/" + this.session.route.name + "/confirmar"]);
      //}
    } else {
      if (r > 0) {
       // alert("Aun debe elegir " + r + " asientos más.");
        this.isLoading = false
        this.displayModal = true;
        this.notifTitle = "";
        if(r == 1){
          this.notifBody = "Aun debe elegir " + r + " asiento más.";
        }else(this.notifBody = "Aun debe elegir " + r + " asientos más.")       
        this.route = this.routeX;
       
      } else {
        this.setSelectedSegment(this.segments[i + 1]);
        this.resetSlick();
      }
    }
  }
  resetSlick(){
    this.slickAlive = false;
    setTimeout(()=>{
      this.slickAlive = true;
    },100);
  }

  segment(){
   
  }
  onBack() {
    let i: number = this.segments.indexOf(this.selected_segment);
    if (i != 0) {
      //if (confirm("¿Desea regresar a la pantalla anterior?")) {
        this.isLoading = false
        this.displayModalReturn = true;
        this.notifTitle = "";
        this.notifBody = "¿Desea regresar a la escala anterior?";  //Esto ni es pregunta... solo existe la opcion de aceptar... e igual hace el cambio.           
        this.route = this.routeX;
        this.resetSlick();
      //this.router.navigate(["/reservaciones/" + this.session.route.name + "/paso4"]);
      //}
    } else {
      this.router.navigate(["/reservaciones/" + this.session.route.name + "/paso4"]);
      
     // this.setSelectedSegment(this.segments[i - 1]);
    }
  }
  getWagonType2(wagon: Wagon): string {
    if (wagon.type.id == 4) { return "classic"; }
    if (wagon.type.id == 3) { return "premium"; }    
    if (wagon.type.id == 1) { return "classic regional"; }
    return "classic";
  }
  getRowClasses(i: number, vagonId: number): string {
    switch (vagonId) {
      case 1:
        if (i == 0 || i == 6 ) return ""; 
        else return "flip";
      case 3:
        if (i % 2 == 0) return ""; 
        else return "flip";
      case 4:
        if (i < 7) return ""; 
        else return "flip";
      default:
        return "";
    }
  }
  fly_max: number = -1;
  public shouldFly(): boolean {
    return false;
    /*  this.fly_max = document.body.clientHeight-screen.height;
    
    let a = document.scrollingElement || document.body;
    if(a.scrollTop > this.fly_max){
      return false;
    }else{
      return true;
    }*/
  }
  public seatsHeadOnLeft(seat: number): boolean {
    switch (this.session.query.class.id) {
      case 1:
        if (seat == 39 || seat == 63) {
          return true;
        }
        break;
      case 4:
      if (seat == 6 || seat == 14 || seat == 22 || seat == 30 || seat == 38 || seat == 46) {
        return true;
        }        
        break;
      case 5:        
        if (seat == 28) {
          return true;
        }
      break ;
      default:
      return false;
    }
  } 
  public seatsHeadOnRight(seat: number): boolean {
    switch (this.session.query.class.id) {
      case 1:
        if (seat == 37 || seat == 61) {
          return true;
        }
        break;
      case 4:
      if (seat == 1 || seat == 9 || seat == 17 || seat == 25 || seat == 33 || seat == 41) {
        return true;
        }
        break;
      case 5:
      if (seat == 25) {
        return true;
      }
      break ;
      default:
      return false;
    }
  } 
}
