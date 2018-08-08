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
import { Cost } from '../../model/cost';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit {

  constructor(private location:Location, 
    private model:ModelService, 
    public session:SessionService,
    private router:Router,
    private http: HttpClient) { }

    public is_getting_quote:boolean = false;
    public is_captcha_solved:boolean = false;
    public segments:Segment[] = [];
  ngOnInit() {
    if(!this.session || !this.session.route ||  !this.session.query || !this.session.segments || !this.session.rb){
      this.router.navigate(["/reservaciones"]);return;
    }
    console.log("confseg");
    console.log(this.segments);
    this.segments = this.session.mkUnifiedSegments();
    console.log("unified");
    console.log(this.segments);
    this.session.segments = this.segments;
    this.is_captcha_solved = false;
    this.is_getting_quote = true;
    this.session.rb.status = RouteBooking.editing;
    this.model.saveRouteBooking(this.session.rb).subscribe((response:Response<RouteBooking>)=>{
      this.session.rb = response.data;
      this.is_getting_quote = false;
    });
  }

  public goBack(){
    this.location.back();
  }
  public bookIt(){
    if(confirm("¿Desea proceder al pago?")){
      this.router.navigate(["/reservaciones/"+this.session.route.name+"/pago"]);
      // this.session.rb.status = RouteBooking.booked; 
      // this.model.saveRouteBooking(this.session.rb).subscribe((response:Response<RouteBooking>)=>{
      //   this.session.rb = response.data;
      //   this.router.navigate(["/reservaciones/"+this.session.route.name+"/pago"]);

      //   /*
      //   if(this.session.rb.status == RouteBooking.booked){
      //     //alert("Reservación realizada exitósamente, recibirá un correo electrónico con la confirmación de su reservación");
      //     this.router.navigate(["/reservaciones/"+this.session.route.name+"/reservación-exitosa"]);
      //   }else{
      //     alert("No se pudo concretar su reservación, inténtelo de nuevo luego de algunos segundos.");
      //   }*/
      // });
      
    }
  }
  public getCosts():Cost[]{
    var costs={};

    for(var i=0;i<this.session.rb.seats.length;i++){
      let sb:SeatBooking = this.session.rb.seats[i];
      let a:number = sb.cost.amount;
      let b:string = sb.cost.currency;
      if(!costs[b]){
        costs[b] = new Cost();
        costs[b].currency = b;
        costs[b].amount = 0;
      }
      costs[b].amount+=a;
    }
    var costs2:Cost[] = [];
    for(var j in costs){
      let c:Cost = costs[j];
      costs2.push(c);
    }
    return costs2;
  }
  captchaSolved(captchaResponse: string){
    this.is_captcha_solved=true;
    this.http.post('https://www.google.com/recaptcha/api/siteverify',{
      'secret':'6LfMUFIUAAAAADHKkgMSv6WKj8-PuuE6jgGHszpR',
      'response':captchaResponse
    }).subscribe(data => {
      this.is_captcha_solved=true;
    });
  }
}
