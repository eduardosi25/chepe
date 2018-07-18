import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrainStop } from '../../model/trainstop';
import { SessionService } from '../../session.service';
import { AvailabilityQuery2 } from '../../model/availabilityquery2';
import { PassengerType } from '../../model/passengertype';
import { DomSanitizer } from '@angular/platform-browser';
import { Direction } from '../../model/direction';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Route2 } from '../../model/route2';
import { AvailabilityQuery } from '../../model/availabilityquery';
import { Response } from '../../model/response';
import { Schedule } from '../../model/schedule';
import {Observable, Subscription} from 'rxjs/Rx';
import { WagonType } from '../../model/wagontype';
import { Wagon } from '../../model/wagon';
import { $$ } from '../../../../node_modules/protractor';
declare var $: any;

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  constructor(private activated_route:ActivatedRoute, 
    private location:Location, 
    private model:ModelService, 
    public session:SessionService,
    private sanitizer: DomSanitizer,
  private router:Router) { }

  public route:Route2 = null;
  ngOnInit() {
    if(this.session.query == null){
      this.session.query = new AvailabilityQuery2(this.model);
      this.session.query.start = null; //(new Date((new Date()).getTime()+(1000*60*60*24))).toString();
      this.session.query.end = null; //(new Date((new Date()).getTime()+(1000*60*60*24))).toString();
      this.session.query.src = null;
      this.session.query.dst = null;
    }
    //clean session
    this.wts = null;
    this.session.rb = null;
    this.session.segments = null;
    this.session.segments2 = null;
    this.session.schedule = null;
    let route_name = this.activated_route.snapshot.paramMap.get('route_name');
    this.route = this.model.getRouteByName(route_name);
    if(!this.route){
      this.router.navigate(["/reservaciones"]);return;
    }
    this.session.route = this.route;

    // Funcion de calendario
    $.fn.datepicker.dates['es'] = {
      days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: "Hoy",
      monthsTitle: "Meses",
      clear: "Borrar",
      weekStart: 1,
      format: "dd/mm/yyyy"
    };
    
    setTimeout(function(){

      // Datarange
      $('.input-daterange').datepicker({
        todayHighlight: true, 
        language:'es',
      });

      // Funcion de agregar / eliminar escalas
      $(".js-clone").on('click', function(e){
        e.preventDefault(); 
        var myParents = $(this).parents('.search__block')
        var miSons = $(this).parents('.search__block').find(".search__inside")
        myParents.find(".search__row:first-child").clone().appendTo(miSons);
      });
      $("body").delegate('.js-delete', 'click', function(e){
        e.preventDefault(); 
        $(this).parents('.search__row').remove();
      });

      // Función de cambio de viaje redondo/sencillo
      $("input[name=trip]").on( "change", function() {
          $(".search--round-trip").toggle();
      });

    }, 1000);


  }
  public getRouteStops():TrainStop[]{
    var tss:TrainStop[] = [];
    if(this.session.query.src == null || this.session.query.dst == null){return tss;}
    let src:TrainStop = this.session.query.src;
    let dst:TrainStop = this.session.query.dst;
    let direction:number = src.km < dst.km ? Direction.up : Direction.down;

    for(var i=0;i<this.route.stops.length;i++){
      let ts:TrainStop = this.route.stops[i];
      if(ts == src || ts == dst){continue;}
      if(direction == Direction.up && ts.km>src.km && ts.km < dst.km){tss.push(ts);}
      if(direction == Direction.down && ts.km<src.km && ts.km > dst.km){tss.push(ts);}
    }

    return tss;
  }
  public onPickTS(ts:TrainStop){
    var count:number = 0;
    for(var i in this.session.query.stops){
      let x = this.session.query.stops;
      if(x){
        count++;
      }
    }

    let x = this.session.query.stops[ts.id];
    if(x){
      delete this.session.query.stops[ts.id];
    }else{
      if(count >= this.route.max_stops){
        alert("Sólo puedes elegir "+this.route.max_stops+" escalas.");
        return false;
      }
      this.session.query.stops[ts.id] = true;
    }
  }
  public isMiddle(i:number,ts:TrainStop){
    if(ts == this.session.query.src || ts == this.session.query.dst){return false;}
    return true;
  }
  public getSrcs(direction:number=Direction.up):TrainStop[]{
    return this.route.getSrcs(direction);
  }
  public getDsts(direction:number=Direction.up,src:TrainStop=null):TrainStop[]{
    return src == null ? this.getSrcs(direction):this.route.getDsts(direction,src.id);
  }
  public last_failure_motive:string = null;
  public a1(id:string,cl:string=null){
    var a = document.getElementById(id);
    if(a){
      a.classList.remove('orange');
      if(cl != null){
        a.classList.add(cl);
      }
    }
  }
  public readyToGoNext():boolean{
    this.last_failure_motive = null;
    this.a1('origen');this.a1('destino');this.a1('pasajeros');this.a1('inicio');this.a1('fin');this.a1('clase');
    if(this.session.query.src == null){this.last_failure_motive = "Elige un origen";this.a1('origen','orange');return false;}
    if(this.session.query.dst == null){this.last_failure_motive = "Elige un destino";this.a1('destino','orange');return false;}
    var start_dt:Date = new Date(this.session.query.start);
    var end_dt:Date = new Date(this.session.query.end);
    var now_dt:Date = new Date();
    var nstops = 0;
    for(var i in this.session.query.stops){
      if(this.session.query.stops[i]){nstops++;}
    }
    if(this.session.route.pick_class && this.session.query.class == null){this.last_failure_motive = "Elige una clase.";this.a1('clase','orange');return false;}
    var min_end_dt:Date = new Date(start_dt.getTime()+(nstops*1000*60*60*24));
    if(this.session.query.round){
      let t = min_end_dt.getTime();
      t+=((nstops+0)*1000*60*60*24);
      min_end_dt = new Date(t);
    }
    if(start_dt.getTime() < now_dt.getTime()){this.last_failure_motive = "Elige inicio válido";this.a1('inicio','orange');return false;}
    $('#end-warning').text('');
    if(end_dt.getTime() < now_dt.getTime() || end_dt.getTime() < min_end_dt.getTime()){
      this.last_failure_motive = "Elige un fin válido.";
      this.a1('fin','orange');
      $('#end-warning').text('Elige una fecha posterior o igual a '+min_end_dt.getFullYear()+"-"+(min_end_dt.getMonth()+1)+"-"+min_end_dt.getDate());
      return false;
    }
    if(this.session.query.getTotalPassengers()<=0){this.last_failure_motive = "Elige pasajeros.";this.a1('pasajeros','orange');return false;}
    return true;
  }
  public add(pt:PassengerType,d:number){
    var a = this.session.query.passengers[pt.id];
    a+=d;
    a = a<pt.min ? pt.min : a;
    a = a>pt.max ? pt.max : a;
    this.session.query.passengers[pt.id] = a;
    this.preflight();
  }
  public getTotalPassengers():string{
    return this.session.query.getPassengersString(this.route);
  }
  public getCoordinates(ts:TrainStop){
    if(ts.px >= 0 && ts.py >= 0){
      let styles:string = "left:"+(ts.px*100)+"%;top:"+(ts.py*100)+"%;";
      return this.sanitizer.bypassSecurityTrustStyle(styles);  
    }
    let map={
      x0:26.319957,
      y0:-106.379820,
      x1:29.835939,
      y1:-111.068201
    }
    let xdif:number = map.x1-map.x0;
    let ydif:number = map.y1-map.y0;
    var px:number = (ts.latitude-map.x0)/xdif;
    var py:number = (ts.longitude-map.y0)/ydif;
    let styles:string = "left:"+(px*100)+"%;top:"+(py*100)+"%;";

    return this.sanitizer.bypassSecurityTrustStyle(styles);
  }
  public canSelectMap():boolean{
    return (this.session.query.src != null  && this.session.query.dst != null);
  }
  public onMap(){
    if(this.canSelectMap()){
      $('#map-stops').modal('show');
    }else{
      alert("Debes elegir un origen y un destino");
    }
    
  }
  public preflight(){
    if(this.session.preflight != null){
      this.session.preflight.unsubscribe();
    }
    if(this.session.query.isReady()){
      let aq:AvailabilityQuery = this.session.query.toAvailabilityQuery(this.session.route);
      var a =this.model.getRouteScheduleAvailable(this.session.route.id,aq);
      this.session.preflight = a.subscribe(((r:Response<Schedule>)=>{
        this.session.schedule = r.data;
      }));
    }
    
  }
  public wts:Wagon[] = null;
  public getClasses(route:Route2):Wagon[]{
    if(this.wts != null){
      return this.wts;
    }
    this.wts = [];
    var wtsi = {};
    if(route != null){
      if(route.wagons != null){
        if(route.wagons.length>0){
          for(var i=0;i<route.wagons.length;i++){
            let w:Wagon = route.wagons[i];
            if(w != null){
              if(w.name != null){
                this.wts.push(w);
              }
            }
          }
        }
      }
    }
    return this.wts;
  }
}
