import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ModelService } from '../../model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrainStop } from '../../model/trainstop';
import { SessionService } from '../../session.service';
import { AvailabilityQuery2 } from '../../model/availabilityquery2';
import { PassengerType } from '../../model/passengertype';
import { DomSanitizer } from '@angular/platform-browser';
import { Direction } from '../../model/direction';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Route2 } from '../../model/route2';
import { AvailabilityQuery } from '../../model/availabilityquery';
import { Response } from '../../model/response';
import { Schedule } from '../../model/schedule';
import { Observable, Subscription } from 'rxjs/Rx';
import { WagonType } from '../../model/wagontype';
import { Wagon } from '../../model/wagon';
import { PreviousRouteService } from '../../previous-route.service';
import { HttpClient } from '@angular/common/http';
import { $$ } from '../../../../node_modules/protractor';
import { Trip } from '../../model/trip';
import { query } from '@angular/core/src/render3/instructions';
import { TranslateService } from '@ngx-translate/core';
import { DISABLED } from '@angular/forms/src/model';
import { detectChanges } from '@angular/core/src/render3';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { checkBindingNoChanges, checkBinding } from '@angular/core/src/view/util';
import { isNumber } from 'util';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';


// import { MyDatePickerModule } from './mydatepicker';
declare var $: any;
@NgModule({
  imports: [HttpClient]
})
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

  constructor(private activated_route: ActivatedRoute,
    private translate: TranslateService,
    private location: Location,
    private model: ModelService,
    public session: SessionService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private previousRouteService: PreviousRouteService) { }
  public route: Route2 = null;
  public trips: Trip[] = [new Trip(0, 0, new Date())];
  public trips2: Trip[] = [new Trip(0, 0, new Date())];
  public numStops: number = 0;
  public avaStops: TrainStop[] = [];
  public step1: string;
  public constStop: boolean;
  public constDate: boolean = true;
  public constBackStop: boolean = null;
  public constBackDate: boolean = null;
  public constBackOrigin: boolean;
  public flagDisabled: boolean;
  public flagOrigin: boolean;
  public stopNumErr: number;
  public dateNumErr: number;
  public radio: boolean = null;
  public keySrc: number;
  public keyDst: number;
  public key1Dst: number;
  public firstKey: boolean = null;
  public lastKey: boolean = null;
  public keyDst1: boolean = null;
  public keyDst2: boolean = null;

  // public stops:TrainStop[] = this.stops;
  ngOnInit() {

    var aq: AvailabilityQuery2 = new AvailabilityQuery2(this.model);
    if (this.previousRouteService.getPreviousUrl().indexOf('reservaciones/') == -1 || this.session.query == null) {
      this.session.query = new AvailabilityQuery2(this.model);
      // this.session.query.start = null; //(new Date((new Date()).getTime()+(1000*60*60*24))).toString();
      // this.session.query.end = null; //(new Date((new Date()).getTime()+(1000*60*60*24))).toString();
      // this.session.query.src = null;
      // this.session.query.dst = null;
    }
    //clean session
    this.wts = null;
    this.session.rb = null;
    this.session.segments = null;
    this.session.segments2 = null;
    this.session.schedule = new Schedule();
    let route_name = this.activated_route.snapshot.paramMap.get('route_name');
    this.route = this.model.getRouteByName(route_name);
    if (!this.route) {
      this.router.navigate(["/reservaciones"]); return;
    }
    this.session.route = this.route;
    this.createInstance();
    this.avaStops = this.getSrcs(0);
  }

  createInstance() {
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
      format: "yyyy-mm-dd"
    };

    setTimeout(function () {
      // Datarange
      // $('.input-daterange').datepicker({
      //   todayHighlight: true, 
      //   language:'es'
      // });
      // // webshims.setOptions('forms-ext', {types: 'date'});
      // // webshims.polyfill('forms forms-ext');
      // // $.webshims.formcfg = {
      // //   en: {
      // //       dFormat: '-',
      // //       dateSigns: '-',
      // //       patterns: {
      // //           d: "mm-dd-yy"
      // //       }
      // //   }
      // // };
      // Funcion de agregar / eliminar escalas
      $(".js-clone").on('click', function (e) {
        e.preventDefault();
        var myParents = $(this).parents('.search__block')
        var miSons = $(this).parents('.search__block').find(".search__inside")
        myParents.find(".search__row:first-child").clone().appendTo(miSons);
      });
      $("body").delegate('.js-delete', 'click', function (e) {
        e.preventDefault();
        $(this).parents('.search__row').remove();
      });

      // Función de cambio de viaje redondo/sencillo
      $("input[name=trip]").on("change", function () {
        $(".search--round-trip").toggle();
      });

      // Function temporal de modal
      $(".js-open-modal").click(function (e) {
        e.preventDefault();
        $("#mapa-full").addClass("active");
      });
      $(".js-close-modal").click(function (e) {
        e.preventDefault();
        $("#mapa-full").removeClass("active");
      });

      // Datepicker
      $("#datepicker").datepicker({
        autoSize: true,
        todayHighlight: true,
        language: 'es',
        onSelect: function(dateText, inst) { 
          var dateAsString = dateText; //the first parameter of this function
          var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
          console.log("La fecha " + dateAsObject);
          console.log(dateAsString);
       }
      }).on("change", function() {
          var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method
          console.log("La fecha " + dateAsObject);
          $(".cambiar-fecha").each(function(){
            $(this).html(dateAsObject);
          });
      });

      

      

      //Tooltip
      $(".js-my-tooltip").click(function (e) {
        $(".tooltiptext").toggleClass("active");
      });

      // //getter
      // var maxDate = $( "#step1-start-dt" ).datepicker( "option", "maxDate" );
      // //setter
      // $( "#step1-start-dt" ).datepicker( "option", "maxDate", '+1m +1w' );
    }, 1000);
  }

  public countTrips(n: number) {
    if (this.trips.length >= n) {
      return true;
    }
  }
  public countTrips2(n: number) {
    if (this.trips2.length >= n) {
      return true;
    }
  }
  public countStops(tr: Trip[]) {
    if (tr.length > 1)
      return true;
  }

  public onDateChange(e, tr: Trip) {
    tr.start = e;
    var dateBack = null
    if (this.trips.length == 2) {
      if (this.trips[0].start.getTime() >= this.trips[1].start.getTime()) { this.constDate = true; this.dateNumErr = 2; }
      else (this.constDate = null)
    }
    if (this.trips.length == 3) {
      if (this.trips[1].start.getTime() <= this.trips[0].start.getTime()) { this.dateNumErr = 2; this.constDate = true }
      else if (this.trips[2].start.getTime() <= this.trips[1].start.getTime()) { this.dateNumErr = 3; this.constDate = true }
      else (this.constDate = null)
    }
    ///////////Viaje de regreso//////////////
    if (this.radio) {
      for (const key in this.trips) {
        var pos = key
      } dateBack = this.trips[pos].start
      if (this.trips2.length == 1) {
        if (this.trips2[0].start.getTime() <= dateBack.getTime()) { this.constBackDate = true; this.dateNumErr = 4; }
        else (this.constBackDate = null)
      }
      if (this.trips2.length == 2) {
        if (this.trips2[0].start.getTime() <= dateBack.getTime()) { this.constBackDate = true; this.dateNumErr = 4; }
        else if (this.trips2[1].start.getTime() <= this.trips2[0].start.getTime()) { this.constBackDate = true; this.dateNumErr = 5; }
        else (this.constBackDate = null)
      }
      if (this.trips2.length == 3) {
        if (this.trips2[0].start.getTime() <= dateBack.getTime()) { this.constBackDate = true; this.dateNumErr = 4; }
        else if (this.trips2[1].start.getTime() <= this.trips2[0].start.getTime()) { this.constBackDate = true; this.dateNumErr = 5; }
        else if (this.trips2[2].start.getTime() <= this.trips2[1].start.getTime()) { this.constBackDate = true; this.dateNumErr = 6; }
        else (this.constBackDate = null)
      }
    }
    
    
  }
  public onChangeStop(round: boolean, tr: Trip) {

    let index;
    var id_dst1 = null;
    var id_dst2 = null;
    var id_dst3 = null;
    var id_src1 = null;
    var backId_dst1 = null;
    var backId_dst2 = null;
    var backId_dst3 = null;
    var backId_src1 = null;
    var backId = null;
    var getSrcs = null;
    getSrcs = this.getSrcs(0)
    id_src1 = this.trips[0].id_src;

    for (const key in getSrcs) {
      const position = getSrcs[key].id
      if (position == id_src1.id) { this.keySrc = toInteger(key) }
    }
    var getSrcslenngth = this.getSrcs(0).length - 1;
    if (getSrcslenngth == this.keySrc) { this.lastKey = true }
    if (this.keySrc == 0) { this.firstKey = true }

    if (this.trips.length == 2) {
      id_dst1 = this.trips[0].id_dst;
      id_dst2 = this.trips[1].id_dst;
      for (const key in getSrcs) {
        const position = getSrcs[key].id
        if (position == id_dst1.id) { this.keyDst = toInteger(key) }
      }
      var getSrcslenngth = this.getSrcs(0).length - 1;
      if (getSrcslenngth == this.keyDst || this.keyDst == 0) { this.keyDst1 = true }
      if (this.keyDst1) { this.constStop = true; this.keyDst1 = null }
      else if (this.firstKey && id_dst2.id <= id_dst1.id || id_dst1.id == undefined) { this.constStop = true ; this.stopNumErr= 2}
      else if (this.lastKey && id_dst2.id >= id_dst1.id || id_dst1.id == undefined ) { this.constStop = true ; this.stopNumErr= 2}
      else if (this.firstKey && id_dst2.id <= id_dst1.id || id_dst2.id == undefined) { this.constStop = true ; this.stopNumErr= 3}
      else if (this.lastKey && id_dst2.id >= id_dst1.id || id_dst2.id == undefined ) { this.constStop = true ; this.stopNumErr= 3}
      else if (this.firstKey == null && this.lastKey == null && id_dst1.id == id_src1.id || id_dst2.id == id_src1.id){ this.constStop = true ; this.stopNumErr= 2}
      else if (this.firstKey == null && this.lastKey == null && id_dst1.id < id_src1.id && id_dst2.id >= id_dst1.id) { this.constStop = true ; this.stopNumErr= 2}
      else if (this.firstKey == null && this.lastKey == null && id_dst1.id > id_src1.id && id_dst2.id <= id_dst1.id) { this.constStop = true ; this.stopNumErr= 3}
      else (this.constStop = null)
    }

    if (this.trips.length == 3) {
      id_dst1 = this.trips[0].id_dst;
      id_dst2 = this.trips[1].id_dst;
      id_dst3 = this.trips[2].id_dst;
      for (const key in getSrcs) {
        const position = getSrcs[key].id
        if (position == id_dst1.id) { this.keyDst = toInteger(key) }
        if (position == id_dst2.id) { this.key1Dst = toInteger(key) }
      }
      var getSrcslenngth = this.getSrcs(0).length - 1;
      if (getSrcslenngth == this.keyDst || this.keyDst == 0) { this.keyDst1 = true }
      if (getSrcslenngth == this.key1Dst || this.key1Dst == 0) { this.keyDst2 = true }
      if (this.firstKey == null && this.lastKey == null && this.getSrcs(0).length == 4) { this.flagOrigin == true }
      else if (this.keyDst1 || this.keyDst2) { this.constStop = true; this.keyDst1 = null; this.keyDst2 = null }
      else if (id_dst2.id == undefined) { this.constStop = true; this.stopNumErr = 2 }
      else if (id_dst3.id == undefined) { this.constStop = true; this.stopNumErr = 3 }
      else if (this.lastKey) { if (id_dst2.id >= id_dst1.id || id_dst3.id >= id_dst2.id) { this.constStop = true;  this.stopNumErr = 2  } else (this.constStop = null) }
      else if (this.firstKey) { if (id_dst2.id <= id_dst1.id || id_dst3.id <= id_dst2.id) { this.constStop = true; this.stopNumErr = 3  } else (this.constStop = null) }
      else (this.constStop = null)
    }
    ///////////Viaje de regreso//////////////
    if (this.radio) {
      for (const key in this.trips) {
        var pos = key
      } backId = this.trips[pos].id_dst

      if (this.trips2.length == 1) {
        backId_src1 = this.trips2[0].id_src;
        backId_dst1 = this.trips2[0].id_dst;
        if (backId_src1.id != backId.id || backId_src1.id == undefined) { this.constBackOrigin = true; }
        else if (backId_dst1.id == undefined || backId_dst1.id != id_src1.id) { this.stopNumErr = 4; this.constBackOrigin = null;; this.constBackStop = true; }
        else { this.constBackStop = null; this.constBackOrigin = null; }
      }
      if (this.trips2.length == 2) {
        backId_src1 = this.trips2[0].id_src;
        backId_dst1 = this.trips2[0].id_dst;
        backId_dst2 = this.trips2[1].id_dst;
        if (backId_src1.id == backId.id) { this.constBackOrigin = null; }
        else (this.constBackOrigin = true)
        if (this.constBackOrigin == true) { this.constBackOrigin = true }
        else if (backId_dst1.id == undefined) { this.constBackStop = true; this.stopNumErr = 4; }
        else if (backId_dst1.id == backId.id || backId_dst1.id == id_src1.id) { this.constBackStop = true; this.stopNumErr = 4; }
        else if (backId_dst2.id != id_src1.id || backId_dst2.id == undefined) { this.constBackStop = true; this.stopNumErr = 5; }
        else (this.constBackStop = null)
      }
      if (this.trips2.length == 3) {
        backId_src1 = this.trips2[0].id_src;
        backId_dst1 = this.trips2[0].id_dst;
        backId_dst2 = this.trips2[1].id_dst;
        backId_dst3 = this.trips2[2].id_dst;
        if (backId_src1.id == backId.id) { this.constBackOrigin = null; }
        else (this.constBackOrigin = true)
        if (this.constBackOrigin == true) { this.constBackOrigin = true }
        else if (backId_dst1.id == undefined) { this.constBackStop = true; this.stopNumErr = 4; }
        else if ((id_src1.id > backId_src1.id) && (backId_dst1.id == backId.id || backId_dst1.id == id_src1.id || backId_dst1.id == undefined)) { this.constBackStop = true; this.stopNumErr = 4; }
        else if ((id_src1.id < backId_src1.id) && (backId_dst1.id == backId.id || backId_dst1.id == id_src1.id || backId_dst1.id == undefined)) { this.constBackStop = true; this.stopNumErr = 4; }
        else if ((id_src1.id > backId_src1.id) && (backId_dst1.id >= backId_dst2.id || backId_dst2.id == id_src1.id || backId_dst2.id == backId.id || backId_dst1.id == backId.id || backId_dst1.id == backId_dst2.id || backId_dst1.id == id_src1.id || backId_dst2.id == undefined)) { this.constBackStop = true; this.stopNumErr = 5; }
        else if ((id_src1.id < backId_src1.id) && (backId_dst1.id <= backId_dst2.id || backId_dst2.id == id_src1.id || backId_dst2.id == backId.id || backId_dst1.id == backId.id || backId_dst1.id == backId_dst2.id || backId_dst1.id == id_src1.id || backId_dst2.id == undefined)) { this.constBackStop = true; this.stopNumErr = 5; }
        else if (backId_dst3.id != id_src1.id || backId_dst3.id == undefined) { this.constBackStop = true; this.stopNumErr = 6 }
        else (this.constBackStop = null)
      }
    }
    if (round) {
      index = this.trips2.indexOf(tr, 0);

      if (this.trips2.length > 1) {
        this.trips2[index + 1].id_src = this.trips2[index].id_dst;
        // this.trips2[0].id_src = this.trips[this.trips.length -1].id_dst;
      }
      else {
        //this.trips2[0].id_src = this.trips[this.trips.length -1].id_dst;        
      }
      if (this.trips.length == index && tr.id_dst != 0) {
        //this.trips2[0].id_src == tr.id_dst;
      }
    }
    else {
      if (this.trips.length > 1) {
        index = this.trips.indexOf(tr, 0);
        this.trips[index + 1].id_src = tr.id_dst;
      }
    }
    this.preflight();

  }
  public onCreateTrip(round: boolean) {
    let index;
    let tr: Trip = new Trip(0, 0, new Date());
    this.constDate = true;
    this.constStop = true;
    if(this.radio){this.constBackDate=true}
    if ((this.radio)&&(this.trips2[0].id_src != 0)) { this.constBackStop = true; this.stopNumErr = 4 }
    if ((this.radio)&&( this.trips2[0].id_src == 0 || this.trips2[0].id_src == undefined)) { this.constBackOrigin = true }
    if (this.trips.length == 1) { this.stopNumErr = 2 }
    if (this.trips.length == 1) { this.dateNumErr = 2 }
    if (this.trips2.length == 1) { this.stopNumErr = 5 }
    if (this.trips2.length == 1) { this.dateNumErr = 5 }
    if (round) {
      this.trips2.push(tr);
      index = this.trips2.indexOf(tr, 0);
      this.trips2[index].id_src = this.trips2[index - 1].id_dst;
    }
    else {
      this.trips.push(tr);
      index = this.trips.indexOf(tr, 0);
      // console.log(this.trips[index-1].id_dst);
      this.trips[index].id_dst = this.trips[index - 1].id_dst;
      this.trips[index - 1].id_dst = 0;
    }
    this.createInstance();
    this.numStops++;
    this.onChangeStop(true, this.trips[0])
  }

  public onDeleteTrip(tr: Trip, round: boolean) {
    let index;
    if (round) {
      index = this.trips2.indexOf(tr, 0);
      if (index > 0) {
        this.trips2.splice(index, 1);
      }
    }
    else {
      index = this.trips.indexOf(tr, 0);
      if (index > 0) {
        this.trips.splice(index, 1);
      }
    }
    this.numStops--;
  }
  public getDate(with_weekday: boolean = true): string {
    let d: Date = new Date();
    //let d:Date = this.mkDate(this.trips[0].start);
    var s: string = "";
    if (with_weekday) {
      s += this.getWeekday(d.getDay(), false) + " ";
    }
    s += d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    return s;
  }
  public getWeekday(n: number = -1, full: boolean = true): string {
    if (n == -1) {
      let d: Date = new Date();
      //let d:Date = this.mkDate(this.trips[0].start);
      return this.getWeekday(d.getDay(), full);
    }
    if (!full) {
      switch (n) {
        case 0: return 'Dom';
        case 1: return 'Lun';
        case 2: return 'Mar';
        case 3: return 'Mié';
        case 4: return 'Jue';
        case 5: return 'Vie';
        case 6: return 'Sáb';
      }
    } else {
      switch (n) {
        case 0: return 'Domingo';
        case 1: return 'Lunes';
        case 2: return 'Martes';
        case 3: return 'Miércoles';
        case 4: return 'Jueves';
        case 5: return 'Viernes';
        case 6: return 'Sábado';
      }
    }
  }
  public getRouteStops(): TrainStop[] {
    var tss: TrainStop[] = [];
    // if(this.session.query.src == null || this.session.query.dst == null){return tss;}
    // let src:TrainStop = this.session.query.src;
    // let dst:TrainStop = this.session.query.dst;
    let direction: number = 1;// src.km < dst.km ? Direction.up : Direction.down;
    for (var i = 0; i < this.route.stops.length; i++) {
      let ts: TrainStop = this.route.stops[i];
      // if(ts == src || ts == dst){continue;}
      // if(direction == Direction.up && ts.km>src.km && ts.km < dst.km){tss.push(ts);}
      // if(direction == Direction.down && ts.km<src.km && ts.km > dst.km){tss.push(ts);}
    }
    return tss;
  }
  public onPickTS(ts: TrainStop) {
    // var count:number = 0;
    // for(var i in this.session.query.stops){
    //   let x = this.session.query.stops;
    //   if(x){
    //     count++;
    //   }
    // }
    // let x = this.session.query.stops[ts.id];
    // if(x){
    //   delete this.session.query.stops[ts.id];
    // }else{
    //   if(count >= this.route.max_stops){
    //     alert("Sólo puedes elegir "+this.route.max_stops+" escalas.");
    //     return false;
    //   }
    //   this.session.query.stops[ts.id] = true;
    // }
  }
  public isMiddle(i: number, ts: TrainStop) {
    // if(ts == this.session.query.src || ts == this.session.query.dst){return false;}
    // return true;
  }
  public getSrcs(direction: number = Direction.up): TrainStop[] {
    return this.route.getSrcs(direction);
  }
  public getDsts(direction: number = Direction.up, src: TrainStop = null): TrainStop[] {
    if (src == null) {
      return this.getSrcs(direction)
    }
    else {
      this.avaStops = this.route.getDsts(direction, src.id);
      for (let i = 0; i < this.trips.length; i++) {
        let e = this.trips[i];
        let idx = this.trips.indexOf(this.trips[i]);
        this.avaStops.splice(idx, 0)
      }
      return this.avaStops;
    }
    // return src == null ? this.getSrcs(direction):this.route.getDsts(direction,src.id);
  }
  public last_failure_motive: string = null;
  public a1(id: string, cl: string = null) {
    var a = document.getElementById(id);
    if (a) {
      a.classList.remove('orange');
      if (cl != null) {
        a.classList.add(cl);
      }
    }
  }
  
  public readyToGoNext(): boolean {
    this.last_failure_motive = null;
    this.a1('origen'); this.a1('destino');
    this.a1('pasajeros'); this.a1('inicio');
    this.a1('fin'); this.a1('clase');
    this.a1('fecha1'); this.a1('fecha2');
    this.a1('fecha3'); this.a1('fecha4');
    this.a1('fecha5'); this.a1('fecha6');
    this.a1('origen4');
    this.a1('destino2'); this.a1('destino3');
    this.a1('destino4'); this.a1('destino5');
    this.a1('destino6');
    // if(this.session.query.src == null){this.last_failure_motive = "Elige un origen";this.a1('origen','orange');return false;}
    // if(this.session.query.dst == null){this.last_failure_motive = "Elige un destino";this.a1('destino','orange');return false;}
    if (this.session.route.pick_class && this.session.query.class == null) { this.flagDisabled = true; this.last_failure_motive = "Elige una clase."; this.a1('clase', 'orange'); this.step1 = this.translate.instant('Step1-P66'); return true; }
    if (this.trips[0].id_src == null || this.trips[0].id_src == 0) { this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.a1('origen', 'orange'); this.step1 = this.translate.instant('Step1-P67'); return true; }
    if (this.trips[0].id_dst == null || this.trips[0].id_dst == 0) { this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.a1('destino', 'orange'); this.step1 = this.translate.instant('Step1-P68'); return true; }
    var now_dt: Date = new Date();
    if (this.trips[0].start.getTime() < now_dt.getTime()) { this.flagDisabled = true; this.last_failure_motive = "Elige inicio válido"; this.a1('fecha1', 'orange'); this.step1 = this.translate.instant('Step1-P69'); return true; }
    if (this.trips.length > 1 && this.constStop) { this.a1('destino' + this.stopNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.step1 = this.translate.instant('Step1-P68'); return true; }
    if (this.trips.length > 1 && this.constDate) { this.a1('fecha' + this.dateNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige una fecha"; this.step1 = this.translate.instant('Step1-P70'); return true; }
    if (this.trips.length > 1 && this.flagOrigin) { this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P71'); this.a1('origen', 'orange'); return true; }
    if ((this.radio)&&(this.trips2.length >= 1 && this.constBackOrigin)) { this.a1('origen4 ', 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P71'); return true; }
    if ((this.radio)&&(this.trips2.length >= 1 && this.constBackStop)) { this.a1('destino' + this.stopNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.step1 = this.translate.instant('Step1-P68'); return true; }
    if ((this.radio)&&(this.trips2.length >= 1 && this.constBackDate)) { this.a1('fecha' + this.dateNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige una fecha"; this.step1 = this.translate.instant('Step1-P70'); return true; }
  
    // var start_dt:Date = new Date(this.session.query.start);
    // var end_dt:Date = new Date(this.session.query.end);
    // var now_dt:Date = new Date();
    // var nstops = 0;
    // for(var i in this.session.query.stops){
    //   if(this.session.query.stops[i]){nstops++;}
    // }
    // var min_end_dt:Date = new Date(start_dt.getTime()+(nstops*1000*60*60*24));
    // if(this.session.query.round){
    //   let t = min_end_dt.getTime();
    //   t+=((nstops+0)*1000*60*60*24);
    //   min_end_dt = new Date(t);
    // }
    // if(start_dt.getTime() < now_dt.getTime()){this.last_failure_motive = "Elige inicio válido";this.a1('inicio','orange');return false;}
    // $('#end-warning').text('');
    // if(end_dt.getTime() < now_dt.getTime() || end_dt.getTime() < min_end_dt.getTime()){
    //   this.last_failure_motive = "Elige un fin válido.";
    //   this.a1('fin','orange');
    //   $('#end-warning').text('Elige una fecha posterior o igual a '+min_end_dt.getFullYear()+"-"+(min_end_dt.getMonth()+1)+"-"+min_end_dt.getDate());
    //   return false;
    // }
    this.session.query2 = new AvailabilityQuery2(this.model);
    // this.session.query2 = this.session.query;
    var clase = this.session.query.class;
    var redondo = this.session.query.round;
    var pax = this.session.query.passengers;
    this.session.query2.trips = this.trips2;
    this.session.query2.class = clase;
    this.session.query2.round = redondo;
    this.session.query2.passengers = pax;
    if (this.session.query.getTotalPassengers() <= 0) {this.flagDisabled = null; this.last_failure_motive = "Elige pasajeros."; this.a1('pasajeros', 'orange'); return true; }
    if (this.last_failure_motive == null) { this.flagDisabled = null; this.step1 = this.translate.instant('Step1-P64'); return true; }

    return true;
  }
  public add(pt: PassengerType, d: number) {
    var a = this.session.query.passengers[pt.id];
    a += d;
    a = a < pt.min ? pt.min : a;
    a = a > pt.max ? pt.max : a;
    this.session.query.passengers[pt.id] = a;
    this.preflight();
  }
  public getTotalPassengers(): string {
    return this.session.query.getPassengersString(this.route);
  }
  public getCoordinates(ts: TrainStop) {
    if (ts.px >= 0 && ts.py >= 0) {
      let styles: string = "left:" + (ts.px * 100) + "%;top:" + (ts.py * 100) + "%;";
      return this.sanitizer.bypassSecurityTrustStyle(styles);
    }
    let map = {
      x0: 26.319957,
      y0: -106.379820,
      x1: 29.835939,
      y1: -111.068201
    }
    let xdif: number = map.x1 - map.x0;
    let ydif: number = map.y1 - map.y0;
    var px: number = (ts.latitude - map.x0) / xdif;
    var py: number = (ts.longitude - map.y0) / ydif;
    let styles: string = "left:" + (px * 100) + "%;top:" + (py * 100) + "%;";

    return this.sanitizer.bypassSecurityTrustStyle(styles);
  }
  public canSelectMap(): boolean {
    return true;//(this.session.query.src != null  && this.session.query.dst != null);
  }
  public onMap() {
    if (this.canSelectMap()) {
      $('#map-stops').modal('show');
    } else {
      alert("Debes elegir un origen y un destino");
    }
  }
  public preflight() {
    if (this.session.preflight != null) {
      this.session.preflight.unsubscribe();
    }
    if (this.session.query.isReady()) {
      this.session.query.trips = this.trips;
      let aq: AvailabilityQuery = this.session.query.toAvailabilityQuery(this.session.route);
      var a = this.model.getRouteScheduleAvailable(this.session.route.id, aq);
      this.session.preflight = a.subscribe(((r: Response<Schedule>) => {
        this.session.schedule = r.data;
        // console.log(this.session.schedule)
      }));
    }

    this.readyToGoNext();
  }
  public wts: Wagon[] = null;
  public getClasses(route: Route2): Wagon[] {
    if (this.wts != null) {
      return this.wts;
    }
    this.wts = [];
    var wtsi = {};
    if (route != null) {
      if (route.wagons != null) {
        if (route.wagons.length > 0) {
          for (var i = 0; i < route.wagons.length; i++) {
            let w: Wagon = route.wagons[i];
            if (w != null) {
              if (w.name != null) {
                this.wts.push(w);
              }
            }
          }
        }
      }
    }
    //console.log(this.wts);
    return this.wts;
  }
  /**
   * onChange
value   */
  public onChange(value) {
    this.session.query.round = value;
    this.radio = value;
    this.constBackDate=true; this.dateNumErr = 4;
    
    
    if (value && this.trips2.length == 0) {
      let trip = new Trip(0, 0, new Date());

      this.trips2.push(trip);
      this.session.query.trips.push(trip);
      this.trips2[0].id_src = this.trips[this.trips.length - 1].id_dst;
    }
    else if (value) {
      this.trips2[0].id_src = this.trips[this.trips.length - 1].id_dst;
    }
    else {
      this.trips2 = [];
      this.session.query.trips = [];
    }
    this.onChangeStop(true, this.trips2[0])
    
  }
  isRegional(route: Route2): boolean {
    // console.log(route.name);
    return (route.name.toLowerCase() == "regional");
  }
  public onMaxStops(round: boolean): boolean {
    // console.log(this.numStops);
    // console.log(this.route.max_stops);
    if (round) {
      if ((this.numStops >= this.route.max_stops || this.numStops == 0 || this.trips2.length == 1)) {
        return false;
      }
      else //if(this.trips.length != 1)
        return true;
    }
    else {

      if ((this.numStops >= this.route.max_stops || this.numStops == 0 || this.trips.length == 1)) {
        return false;
      }
      else //if(this.trips2.length != 1)
        return true;
    }
  }
  public isRound(): boolean {
    return this.session.query.round;
  }
  public display(): boolean {
    // console.log(this.trips2.length)
    if (this.trips2.length == 1) {
      return true;
    }
  }
}