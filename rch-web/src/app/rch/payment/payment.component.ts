import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { SessionService } from '../../session.service';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
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
import { Url } from 'url';
import { UrlWebPay } from '../../model/url';
import { WebPay } from '../../model/webpay';
import { AvailabilityQuery2 } from '../../model/availabilityquery2';
import { Route } from '@angular/compiler/src/core';
import { Route2 } from '../../model/route2';
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private location: Location,
    private model: ModelService,
    public session: SessionService,
    private router: Router,
    private sanitizer: DomSanitizer) { }
  public selected_segment: Segment = null;
  public selected_wagon_type: WagonType = null;
  public segments: Segment[] = [];
  public url: Url;
  public tabla;
  public tabla1;
  public route1;
  public query;
  public schedule;
  public goBack() {
    this.location.back();
  }
   /**Valida que exista un datos en session, si no existe te regresa al paso de reservaciones */
   /**Este paso lo unico que hace es mostrar el iframe webpay */
  ngOnInit() {
    if (!this.session || !this.session.route || !this.session.query || !this.session.segments) {
      this.router.navigate(["/reservaciones"]); return;
    }
    this.schedule = this.session.schedule
    this.query = this.session.query
    this.tabla = this.session
    this.tabla1 = this.session.mkUnifiedSegments();
    this.route1 = JSON.parse(sessionStorage.getItem('route'));
    sessionStorage.clear();
    this.session.rb.status = RouteBooking.booked;
    setTimeout(() => {
      this.model.getWebPayUrl(this.session.rb).subscribe((response: Response<WebPay>) => {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(response.data.referencia.liga);
        let q2: AvailabilityQuery2;
        this.session.query = q2;
        let r: Route2;
        this.session.route = r;
        let s: Segment[];
        this.session.segments = s;
        this.session = null;
      });
    }, 1000);
  }
  /** */
  public getCosts(): Cost[] {
    var costs = {};

    // for(var i=0;i<this.session.rb.seats.length;i++){
    //   let sb:SeatBooking = this.session.rb.seats[i];
    //   let a:number = sb.cost.amount;
    //   let b:string = sb.cost.currency;
    //   if(!costs[b]){
    //     costs[b] = new Cost();
    //     costs[b].currency = b;
    //     costs[b].amount = 0;
    //   }
    //   costs[b].amount+=a;
    // }
    var costs2: Cost[] = [];
    // for(var j in costs){
    //   let c:Cost = costs[j];
    //   costs2.push(c);
    // }
    return costs2;
  }
  /** */
  public bookIt() {
    // this.session.rb.status = RouteBooking.booked;
    //   this.model.saveRouteBooking(this.session.rb).subscribe((response:Response<RouteBooking>)=>{
    //     this.session.rb = response.data;
    //     this.router.navigate(["/reservaciones/"+this.session.route.name+"/reservación-exitosa"]);
    //   });
  }
}
