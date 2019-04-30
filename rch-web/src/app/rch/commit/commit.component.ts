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
import { TranslateService } from '@ngx-translate/core';
/**Componente del paso donde encontaremos el captcha para saber que no se es un bot */
@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private location:Location, 
    private model:ModelService, 
    public session:SessionService,
    private router:Router,
    private http: HttpClient) { }

    public is_getting_quote:boolean = false;
    public is_captcha_solved:boolean = false;
    public segments:Segment[] = [];
    public displayModal = false;
    public notifTitle = "";
    public notifBody = "";
    public notifBody1 = "";
    public isLoading = true;
    public route ;
    public buttonFlag = null;
    public commit;
    public routeX = "/reservaciones/" + this.session.route.name + "/confirmar";
     /**Valida que exista un datos en session, si no existe te regresa al paso de reservaciones */
  ngOnInit() {
    if(!this.session || !this.session.route ||  !this.session.query || !this.session.segments || !this.session.rb){
      this.router.navigate(["/reservaciones"]);return;
    }
    this.commit = this.translate.instant('Com1-P11');
    this.segments = this.session.mkUnifiedSegments();
    this.session.segments = this.segments;
    this.is_captcha_solved = false;
    this.is_getting_quote = true;
    this.session.rb.status = RouteBooking.editing;
    this.model.saveRouteBooking(this.session.rb).subscribe((response:Response<RouteBooking>)=>{
      console.log(response.data);
      this.session.rb = response.data;
      this.is_getting_quote = false;
    });
  }
/**Función para el boton de regresar al paso anterior */
  public goBack(){
    this.location.back();
  }
/**Función para ocultar el model */
  ocultarModel(){
    this.displayModal = false;
  }
/**Función que te manda un aviso si quieres continuar al pago si es asi te redirige al paso de pago */
  public bookIt(){
    let r = JSON.stringify( this.session.rb )
    sessionStorage.setItem('route', r )
    this.isLoading = false
    this.displayModal = true;
    this.notifTitle = "";
    this.notifBody = "¿Desea proceder al pago?";       
        this.route = "/reservaciones/"+this.session.route.name+"/pago";
    //if(confirm("¿Desea proceder al pago?")){
     // this.router.navigate(["/reservaciones/"+this.session.route.name+"/pago"]);
      
      
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
      
    //}
  }
  /**Función que obtine el costo del viaje*/
  public getCosts():Cost[]{
    var costs={};
    console.log("logSeats");
    console.log(this.session.rb.seats);
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
  /**Función del captcha */
  captchaSolved(captchaResponse: string){
    this.buttonFlag = null;
    this.is_captcha_solved=true;
    this.commit = this.translate.instant('Com1-P09');
    // this.is_captcha_solved=true;
    this.http.post('https://www.google.com/recaptcha/api/siteverify',{
      'secret':'6LdqDHQUAAAAALywsAfjmgqDg0k_O682N0XY7-3d',
      'response':captchaResponse
    }).subscribe(data => {
      this.is_captcha_solved=true;
    });
  }
}
