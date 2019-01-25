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
import { detectChanges, t } from '@angular/core/src/render3';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { checkBindingNoChanges, checkBinding } from '@angular/core/src/view/util';
import { isNumber } from 'util';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { constants } from 'os';
import { SourceMapGenerator } from '@angular/compiler/src/output/source_map';


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
  public stopNumErr: number;  public stopOriErr: number; public dateNumErr: number;
  public radio: boolean = null;
  public keySrc1: number;public keySrc2: number;public keySrc3: number;public keySrc4: number;
  public keyDst1: number; public keyDst2: number; public keyDst3: number; public keyDst4: number;
  public keySrcBack: number;
  public keyDstBack1: number; public keyDstBack2: number; public keyDstBack3: number; public keyDstBack4: number;
  public flagSrc: boolean = null;
  public flagDst1: boolean = null; public flagDst2: boolean = null; public flagDst3: boolean = null; public flagDst4: boolean = null;
  public flagSrcBack: boolean = null;
  public flagDstBack1: boolean = null; public flagDstBack2: boolean = null; public flagDstBack3: boolean = null;
  public dateStr = [];
  public dateStrBack = [];
  public keyFlag1; public keyFlag2; public keyFlag3; public keyFlag4; public keyFlag5; public keyFlag6;
  public dateMY = [];
  public dateMYBack = [];
  public tripMaxStop;
  public isChecked;
  public fechaGet = [];
  public fechaGetBack = [];
  public bloqueoCalendario1 = null; bloqueoCalendario2 = null; bloqueoCalendario3 = null; bloqueoCalendario4 = null;
  public bloc1 = true;public bloc2 = true;public bloc3 = true;public bloc4 = true;
  public calendar ;calendar2 ;calendar3 ;calendar4 ;
  public some = new Date();
  public i;
  public c1; c2; c3; c4;
  public cd1; cd2; cd3; cd4;
  public calendarArray1;public calendarArray2;public calendarArray3;public calendarArray4;
  // public stops:TrainStop[] = this.stops;
  ngOnInit() {
    this.calendar = this.some.getDay() + 1;
    if(this.calendar == 7){this.calendar = 0}
    this.dateChange();
    this.isChecked = true;
    console.log(this.isChecked);
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
    console.log(this.session.query);
    if (this.session.query.trips != null) {
      this.trips = this.session.query.trips;
      for (let i = 0; i < this.trips.length; i++) {
        const t: Trip = this.trips[i];
        var day = t.start.getDate();
        var month = t.start.getMonth() + 1;
        var year = t.start.getFullYear();
        this.numStops = i;
        switch (i) {
          case 0:
            this.dateStr[0] = day + "/" + month + "/" + year;
            this.dateMY[0] = true;
            this.fechaGet[0] = t.start; 
            break;
          case 1:
            this.dateStr[1] = day + "/" + month + "/" + year;
            this.dateMY[1] = true;
            this.fechaGet[1] = t.start; 
            break;
          case 2:
            this.dateStr[2] = day + "/" + month + "/" + year;
            this.dateMY[2] = true;
            this.fechaGet[2] = t.start; 
            break;
          case 3:
            this.dateStr[3] = day + "/" + month + "/" + year;
            this.dateMY[3] = true;
            this.fechaGet[3] = t.start; 
            break;
          default:
            this.dateStr[0] = day + "/" + month + "/" + year;
            this.dateMY[0] = true;
            this.fechaGet[0] = t.start; 
            break;
        } 
      }
      // this.trips.forEach(trip => {
      //   //this.dateStr1 = currDate + "/" + mes  + "/" + currYear
      //   this.dateStr1 = "24/11/2018";
      //  console.log(trip.start);
      // });
    }
    //console.log(this.session.query2);
    console.log("tripos2");
    console.log(this.session.query2);
    if (this.session.query2 != undefined && this.session.query2.trips != null && this.session.query.round) {

      console.log("trips2");
      console.log(this.session.query2);
      this.trips2 = this.session.query2.trips;
      this.isChecked = false;
      console.log(this.isChecked);
      for (let i = 0; i < this.trips2.length; i++) {
        const t: Trip = this.trips2[i];
        var day = t.start.getDate();
        var month = t.start.getMonth() + 1;
        var year = t.start.getFullYear();
        this.numStops = this.numStops + i;
       
        switch (i) {
          case 0:
            this.dateStrBack[0] = day + "/" + month + "/" + year;
            this.dateMYBack[0] = true;
            this.fechaGetBack[0] = t.start; 
            break;
          case 1:
            this.dateStrBack[1] = day + "/" + month + "/" + year;
            this.dateMYBack[1] = true;
            this.fechaGetBack[1] = t.start; 
            break;
          case 2:
            this.dateStrBack[2] = day + "/" + month + "/" + year;
            this.dateMYBack[2] = true;
            this.fechaGetBack[2] = t.start; 
            break;
          case 3:
            this.dateStrBack[3] = day + "/" + month + "/" + year;
            this.dateMYBack[3] = true;
            this.fechaGetBack[3] = t.start; 
            break;
          default:
            this.dateStrBack[0] = day + "/" + month + "/" + year;
            this.dateMYBack[0] = true;
            this.fechaGetBack[0] = t.start; 
            break;
        } 
      }
      this.onChange(true);
    }
    
   this.dateChange();
    // console.log("query");
    // console.log(this.session.query);

    // if(this.session.query.trips != null)
    // {
    //   var currDate = null;var currDate1 = null;
    //   var currMonth = null;var currMonth1 = null;
    //   var currYear = null;var currYear1 = null;
    //   var mes;
    //   //this.onChange(false);
    //   this.trips = this.session.query.trips;
    //   //this.dates trips[0].start =  currDate + "/" + mes  + "/" + currYear;
    //   currDate = this.session.query.trips[0].start.getDate(); currMonth = this.session.query.trips[0].start.getMonth(); currYear = this.session.query.trips[0].start.getFullYear(); mes = currMonth + 1; this.session.query.trips[0].start= new Date (currYear , currMonth , currDate);//this.trips[1].start = this.fechaGet2;this.dateStr1 = currDate + "/" + mes  + "/" + currYear;
    //   console.log(this.session.query.trips[0].start)
    // }
    // if (this.session.query.round) {
    //   //this.onChange(true);
    //   this.trips2 = this.session.query2.trips;
    // }
    let route_name = this.activated_route.snapshot.paramMap.get('route_name');
    this.route = this.model.getRouteByName(route_name);
    if (!this.route) {
      this.router.navigate(["/reservaciones"]); return;
    }
    this.session.route = this.route;
    this.maxStop();
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
    var self = this;
    

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
      // //DatePicker fecha 1
         $("#datepicker1" ).datepicker({
          language: 'es', format: "dd/mm/yyyy", autoclose: true,
          }).on('changeDate', (e) => {
          self.fechaGet[0] = e.date; 
          self.dateChange(); 
          }).keydown(false); 
      // //DatePicker fecha 2
      $("#datepicker2").datepicker({
         language: 'es', format: "dd/mm/yyyy", autoclose: true, 
      }).on('changeDate', (e) => {
      self.fechaGet[1] = e.date; self.dateChange();
      }).keydown(false);
     
      //DatePicker fecha 3
      $("#datepicker3").datepicker({
       language: 'es', format: "dd/mm/yyyy", autoclose: true, 
      }).on('changeDate', (e) => {
      self.fechaGet[2] = e.date; self.dateChange();
      }).keydown(false);
     
      //DatePicker fecha 4
      $("#datepicker4").datepicker({
        language: 'es', format: "dd/mm/yyyy", autoclose: true, 
      }).on('changeDate', (e) => {
      self.fechaGet[3] = e.date; self.dateChange();
      }).keydown(false);
     
     

      //Tooltip
      $(".js-my-tooltip").click(function (e) {
        $(".tooltiptext").toggleClass("active");
      });
      // //getter
      // var maxDate = $( "#step1-start-dt" ).datepicker( "option", "maxDate" );
      // //setter
      // $( "#step1-start-dt" ).datepicker( "option", "maxDate", '+1m +1w' );

      // Calcular valor 0
      var passengerItem = ".passenger__item";
      var passengerNumber = ".input-number"
      $(passengerItem).each(function () {

        var passengerStatus = $(this).find(passengerNumber).val();
        //console.log(passengerStatus);

        if (passengerStatus == 0) {
          $(this).addClass("active");
        }

      });

      // Plus BTN 
      var plusBtn = ".btn-number[data-type='plus']"
      $(plusBtn).click(function () {
        var passengerStatus = $(this).parents(passengerItem).find(passengerNumber).val();
        //console.log("Aumentar número" + passengerStatus);
        if (passengerStatus >= 1) {
          $(this).parents(passengerItem).removeClass("active");
        }
      });

      // Minus BTN 
      var minusBtn = ".btn-number[data-type='minus']"
      $(minusBtn).click(function () {
        var passengerStatus = $(this).parents(passengerItem).find(passengerNumber).val();
        //console.log("Disminuye número" + passengerStatus);
        if (passengerStatus == 0) {
          $(this).parents(passengerItem).addClass("active");
        }
      });

    }, 1000);
  }
  public disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 6) );
};
  public dateChange() {

    // Viaje de ida
    ////Parada 1
    var currDate = [];
    var currMonth = [];
    var currYear = [];
    var mes;
    var d = new Date();

    for (let i = 0; i < this.trips.length; i++) {

      if (i == 0) {
        if (this.fechaGet[i] == undefined) {
          currDate[i] = d.getDate(); 
          currMonth[i] = d.getMonth(); 
          currYear[i] = d.getFullYear(); 
          this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]);
           mes = this.fechaGet[i].getMonth() + 1;
           this.trips[i].start = this.fechaGet[i]; 
           this.dateStr[i] = this.fechaGet[i].getDate() + "/" + mes + "/" + currYear;
        } else {
          this.trips[i].start = this.fechaGet[i]; 
          currDate[i] = this.fechaGet[i].getDate(); 
          currMonth[i] = this.fechaGet[i].getMonth(); 
          currYear[i] = this.fechaGet[i].getFullYear(); 
          mes = currMonth[i] + 1; 
          this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i];
        }
      }
      /////////////////////
      if (i > 0) {
        if (this.fechaGet[i] == undefined) {
        currDate[i] = this.fechaGet[i - 1].getDate(); 
        currMonth[i] = this.fechaGet[i - 1].getMonth(); 
        currYear[i] = this.fechaGet[i - 1].getFullYear(); 
        mes = currMonth[i] + 1; 
        this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]);
        this.trips[i].start = this.fechaGet[i]; this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i];
        }
        //////////////
        if (this.fechaGet[i] != undefined) {
          if (this.fechaGet[i - 1].getDate() < this.fechaGet[i].getDate() && this.fechaGet[i - 1].getMonth() <= this.fechaGet[i].getMonth() && this.fechaGet[i - 1].getFullYear() <= this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i].getDate(); currMonth[i] = this.fechaGet[i].getMonth(); currYear[i] = this.fechaGet[i].getFullYear(); this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]); this.trips[i].start = this.fechaGet[i]; mes = currMonth[i] + 1; this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i]; this.dateMY[i] = true; }
          /////////////////

          else if (this.fechaGet[i - 1].getDate() >= this.fechaGet[i].getDate() && this.fechaGet[i - 1].getMonth() < this.fechaGet[i].getMonth()) {
            if (this.fechaGet[i - 1].getFullYear() <= this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i].getDate(); currMonth[i] = this.fechaGet[i].getMonth(); currYear[i] = this.fechaGet[i].getFullYear(); this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]); this.trips[i].start = this.fechaGet[i]; mes = currMonth[i] + 1; this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i]; this.dateMY[i] = true; }
            if (this.fechaGet[i - 1].getFullYear() > this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i - 1].getDate(), currMonth[i] = this.fechaGet[i - 1].getMonth(), currYear[i] = this.fechaGet[i - 1].getFullYear(), mes = currMonth[i] + 1, this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]), this.trips[i].start = this.fechaGet[i], this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i], this.dateMY[i] = null }
          }
          ////////////////
          else if (this.fechaGet[i - 1].getDate() >= this.fechaGet[i].getDate() && this.fechaGet[i - 1].getMonth() >= this.fechaGet[i].getMonth()) {
            if (this.fechaGet[i - 1].getFullYear() < this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i].getDate(); currMonth[i] = this.fechaGet[i].getMonth(); currYear[i] = this.fechaGet[i].getFullYear(); this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]); this.trips[i].start = this.fechaGet[i]; mes = currMonth[i] + 1; this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i]; this.dateMY[i] = true; }
            if (this.fechaGet[i - 1].getFullYear() >= this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i - 1].getDate(), currMonth[i] = this.fechaGet[i - 1].getMonth(), currYear[i] = this.fechaGet[i - 1].getFullYear(), mes = currMonth[i] + 1, this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]), this.trips[i].start = this.fechaGet[i], this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i], this.dateMY[i] = null }
          }
          ////////////////
          else if (this.fechaGet[i - 1].getDate() <= this.fechaGet[i].getDate() && this.fechaGet[i - 1].getMonth() >= this.fechaGet[i].getMonth()) {
            if (this.fechaGet[i - 1].getFullYear() < this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i].getDate(); currMonth[i] = this.fechaGet[i].getMonth(); currYear[i] = this.fechaGet[i].getFullYear(); this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]); this.trips[i].start = this.fechaGet[i]; mes = currMonth[i] + 1; this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i]; this.dateMY[i] = true; }
            if (this.fechaGet[i - 1].getFullYear() >= this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i - 1].getDate(), currMonth[i] = this.fechaGet[i - 1].getMonth(), currYear[i] = this.fechaGet[i - 1].getFullYear(), mes = currMonth[i] + 1, this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]), this.trips[i].start = this.fechaGet[i], this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i], this.dateMY[i] = null }
          }
          ////////////////
          else if (this.fechaGet[i - 1].getDate() <= this.fechaGet[i].getDate() && this.fechaGet[i - 1].getMonth() <= this.fechaGet[i].getMonth()) {
            if (this.fechaGet[i - 1].getFullYear() < this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i].getDate(); currMonth[i] = this.fechaGet[i].getMonth(); currYear[i] = this.fechaGet[i].getFullYear(); this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]); this.trips[i].start = this.fechaGet[i]; mes = currMonth[i] + 1; this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i]; this.dateMY[i] = true; }
            if (this.fechaGet[i - 1].getFullYear() >= this.fechaGet[i].getFullYear()) { currDate[i] = this.fechaGet[i - 1].getDate(), currMonth[i] = this.fechaGet[i - 1].getMonth(), currYear[i] = this.fechaGet[i - 1].getFullYear(), mes = currMonth[i] + 1, this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]), this.trips[i].start = this.fechaGet[i], this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i], this.dateMY[i] = null }
          }
          ////////////////
          else (currDate[i] = this.fechaGet[i - 1].getDate(), currMonth[i] = this.fechaGet[i - 1].getMonth(), currYear[i] = this.fechaGet[i - 1].getFullYear(), mes = currMonth[i] + 1, this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]), this.trips[i].start = this.fechaGet[i], this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i], this.dateMY[i] = null);
        }
      }
    }
   this.createInstance(); this.onDateChange();
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

  public onDateChange() {
    this.constDate=null;

    if (this.trips.length == 2) {
      if (this.dateMY[1] == null) { this.constDate = true; this.dateNumErr = 2; }
      else (this.constDate = null)
    }
    if (this.trips.length == 3) {
      if (this.dateMY[1] == null) { this.dateNumErr = 2; this.constDate = true }
      else if (this.dateMY[2] == null) { this.dateNumErr = 3; this.constDate = true }
      else (this.constDate = null)
    }
    if (this.trips.length == 4) {
      if (this.dateMY[1] == null) { this.dateNumErr = 2; this.constDate = true }
      else if (this.dateMY[2] == null) { this.dateNumErr = 3; this.constDate = true }
      else if (this.dateMY[3] == null) { this.dateNumErr = 4; this.constDate = true }
      else (this.constDate = null)
    }
  }
  public onChangeStop(round: boolean, tr: Trip) {
    
    this.calendar2 = 0;
    let index;
    var id_dst1 = null;var id_dst2 = null;var id_dst3 = null;var id_dst4 = null;
    var id_src1 = null;var id_src2 = null;var id_src3 = null;var id_src4 = null;
    var getSrcs = null; getSrcs = this.session.route.stops;
    // Viaje Express
    //Una parada
    if (this.session.route.id == 2) {

  if (this.trips.length == 1){
    
    id_src1 = this.trips[0].id_src;
    id_dst1 = this.trips[0].id_dst;
    this.bloc1 = true;


    if(id_src1.id == undefined){this.constStop=false;this.stopNumErr = 1}
    else if (id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
    
    else ( this.constStop = null , this.bloc1 = null)
    
    for (const key in getSrcs) {
      const position = getSrcs[key].id
      if (position == id_src1.id) { this.keyDst1 = toInteger(key)}
      if (position == id_dst1.id) { this.keySrc1 = toInteger(key)}
    }
    if(this.keySrc1 < this.keyDst1){this.bloqueoCalendario1 = false;this.calendarArray1 = [0, 2, 3, 5]}
    if(this.keySrc1 > this.keyDst1){this.bloqueoCalendario1 = true;this.calendarArray1 =  [1, 3, 4, 6]} 
    
    if(this.bloqueoCalendario1 == true){ 
      if(this.calendar == 1 || this.calendar == 4 || this.calendar == 6){this.c1 = 2, this.cd1 = 2}
    else if(this.calendar == 3){this.c1 = 3, this.cd1 =3}
    else(this.c1 = 1, this.cd1 =1);
  } 
    if(this.bloqueoCalendario1 == false){
    if(this.calendar == 0 || this.calendar == 3 || this.calendar == 5){this.c1 = 2, this.cd1 = 2}
    else if(this.calendar == 2){this.c1 = 3 , this.cd1 = 3}
    else(this.c1=1, this.cd1 =1);
  }
  let self = this;
  
 if(this.bloqueoCalendario1 != null){
   setTimeout(function () {
    $("#datepicker1" ).datepicker("destroy")
    $("#datepicker1" ).datepicker({daysOfWeekDisabled: self.calendarArray1,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.cd1+'d'})
    $("#datepicker1" ).datepicker('setDate','+'+self.c1+'d').on('changeDate', (e) => {self.fechaGet[0] = e.date; self.dateChange();}).keydown(false);
  },1000)  
 }
}



  //Dos paradas
  if (this.trips.length == 2){
    id_src1 = this.trips[0].id_src;
    id_dst1 = this.trips[0].id_dst;
    id_dst2 = this.trips[1].id_dst;
    id_src2 = this.trips[1].id_src;
    this.bloc1 = true;
    this.bloc2 = true;

    if(id_src1.id == undefined){this.constStop=false;this.stopNumErr = 1}
    else if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
    else if(id_src2.id == undefined){this.constStop = false; this.stopNumErr = 2}
    else if(id_dst2.id == undefined || id_dst2.id == id_src2.id){this.constStop = true; this.stopNumErr = 2}
    else (this.constStop = null , this.bloc1 = null , this.bloc2 = null)

    for (const key in getSrcs) {
      const position = getSrcs[key].id
      if (position == id_src1.id) { this.keyDst1 = toInteger(key)}
      if (position == id_dst1.id) { this.keySrc1 = toInteger(key)}
      if (position == id_src2.id) { this.keyDst2 = toInteger(key)}
      if (position == id_dst2.id) { this.keySrc2 = toInteger(key)}
    }
    if(this.keySrc1 < this.keyDst1){this.bloqueoCalendario1 = false;this.calendarArray1 = [0, 2, 3, 5]}
    if(this.keySrc1 > this.keyDst1){this.bloqueoCalendario1 = true;this.calendarArray1 =  [1, 3, 4, 6]} 
    if(this.keySrc2 < this.keyDst2){this.bloqueoCalendario2 = false;this.calendarArray2 = [0, 2, 3, 5]}
    if(this.keySrc2 > this.keyDst2){this.bloqueoCalendario2 = true;this.calendarArray2 =  [1, 3, 4, 6]} 
    
    if(this.bloqueoCalendario1 == true){ 
      if(this.calendar == 1 || this.calendar == 4 || this.calendar == 6){this.c1 = 2}
    else if(this.calendar == 3){this.c1 = 3}
    else(this.c1 = 1);
  } 
    if(this.bloqueoCalendario1 == false){
    if(this.calendar == 0 || this.calendar == 3 || this.calendar == 5){this.c1 = 2}
    else if(this.calendar == 2){this.c1 = 3}
    else(this.c1=1);
  }
  if(this.bloqueoCalendario2 == true){ 
    if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
    else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 2}
    else if(this.calendar == 2 && this.bloqueoCalendario1 == false){this.c2 = this.c1 + 2}
    else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 1}
} 
  if(this.bloqueoCalendario2 == false){
    if(this.calendar == 2 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 2}
    else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 1}
    else  if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
    else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 2}
} 
  let self = this;
  
 if(this.bloqueoCalendario2 != null){
   setTimeout(function () {
    $("#datepicker1" ).datepicker("destroy")
    $("#datepicker2" ).datepicker("destroy")

    $("#datepicker1" ).datepicker({daysOfWeekDisabled: self.calendarArray1,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c1+'d'})
    $("#datepicker1" ).datepicker('setDate','+'+self.c1+'d').on('changeDate', (e) => {self.fechaGet[0] = e.date; self.dateChange();}).keydown(false);
  
   $("#datepicker2" ).datepicker({daysOfWeekDisabled: self.calendarArray2,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c2+'d'})
   $("#datepicker2" ).datepicker('setDate','+'+self.c2+'d').on('changeDate', (e) => {self.fechaGet[1] = e.date; self.dateChange();}).keydown(false);
  },100)  
 } 
}
    //Tres paradas
    if (this.trips.length == 3){
      id_src1 = this.trips[0].id_src;
      id_dst1 = this.trips[0].id_dst;
      id_dst2 = this.trips[1].id_dst;
      id_src2 = this.trips[1].id_src;
      id_dst3 = this.trips[2].id_dst;
      id_src3 = this.trips[2].id_src;
      this.bloc1 = true;
      this.bloc2 = true;
      this.bloc3 = true;

    if(id_src1.id == undefined){this.constStop=false;this.stopNumErr = 1}
    else if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
    else if(id_src2.id == undefined){this.constStop = false; this.stopNumErr = 2}
    else if(id_dst2.id == undefined || id_dst2.id == id_src2.id){this.constStop = true; this.stopNumErr = 2}
    else if(id_src3.id == undefined){this.constStop = false; this.stopNumErr = 3}
    else if(id_dst3.id == undefined || id_dst3.id == id_src3.id){this.constStop = true; this.stopNumErr = 3}
    else (this.constStop = null , this.bloc1 = null , this.bloc2 = null , this.bloc3 = null)

    for (const key in getSrcs) {
      const position = getSrcs[key].id
      if (position == id_src1.id) { this.keyDst1 = toInteger(key)}
      if (position == id_dst1.id) { this.keySrc1 = toInteger(key)}
      if (position == id_src2.id) { this.keyDst2 = toInteger(key)}
      if (position == id_dst2.id) { this.keySrc2 = toInteger(key)}
      if (position == id_src3.id) { this.keyDst3 = toInteger(key)}
      if (position == id_dst3.id) { this.keySrc3 = toInteger(key)}
    }
    if(this.keySrc1 < this.keyDst1){this.bloqueoCalendario1 = false;this.calendarArray1 = [0, 2, 3, 5]}
    if(this.keySrc1 > this.keyDst1){this.bloqueoCalendario1 = true;this.calendarArray1 =  [1, 3, 4, 6]} 
    if(this.keySrc2 < this.keyDst2){this.bloqueoCalendario2 = false;this.calendarArray2 = [0, 2, 3, 5]}
    if(this.keySrc2 > this.keyDst2){this.bloqueoCalendario2 = true;this.calendarArray2 =  [1, 3, 4, 6]} 
    if(this.keySrc3 < this.keyDst3){this.bloqueoCalendario3 = false;this.calendarArray3 = [0, 2, 3, 5]}
    if(this.keySrc3 > this.keyDst3){this.bloqueoCalendario3 = true;this.calendarArray3 =  [1, 3, 4, 6]} 
    
    if(this.bloqueoCalendario1 == true){ 
      if(this.calendar == 1 || this.calendar == 4 || this.calendar == 6){this.c1 = 2}
    else if(this.calendar == 3){this.c1 = 3}
    else(this.c1 = 1);
  } 
    if(this.bloqueoCalendario1 == false){
    if(this.calendar == 0 || this.calendar == 3 || this.calendar == 5){this.c1 = 2}
    else if(this.calendar == 2){this.c1 = 3}
    else(this.c1=3);
  
  }
  if(this.bloqueoCalendario2 == true){ 
    if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
    else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 2}
    else if(this.calendar == 2 && this.bloqueoCalendario1 == false){this.c2 = this.c1 + 2}
    else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 1}
} 
  if(this.bloqueoCalendario2 == false){
    if(this.calendar == 2 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 2}
    else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 1}
    else  if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
    else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 2}
}
this.calendar2 = this.calendar - this.c2; 
if(this.bloqueoCalendario3 == true){ 
  if(this.bloqueoCalendario2 == true && this.calendar2 == 2){this.c3 = this.c2 + 3}
  else if(this.bloqueoCalendario2 == true){this.c3 = this.c2 + 2}
  else if(this.bloqueoCalendario2 == false && this.calendar2 == 1){this.c3 = this.c2 + 2}
  else if(this.bloqueoCalendario2 == false){this.c3 = this.c2 + 1 }
} 
if(this.bloqueoCalendario3 == false){
  if(this.bloqueoCalendario2 == true && this.calendar2 == 2){this.c3 = this.c2 + 2}
  else if(this.bloqueoCalendario2 == true){this.c3 = this.c2 + 1}
  else if(this.bloqueoCalendario2 == false && this.calendar2 == 3){this.c3 = this.c2 + 3}
  else if(this.bloqueoCalendario2 == false){this.c3 = this.c2 + 2 }
}
  let self = this;
  if(this.bloqueoCalendario3 !=null){
   setTimeout(function () {
    $("#datepicker1" ).datepicker("destroy")
    $("#datepicker2" ).datepicker("destroy")
    $("#datepicker3" ).datepicker("destroy")

    $("#datepicker1" ).datepicker({daysOfWeekDisabled: self.calendarArray1,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c1+'d'})
    $("#datepicker1" ).datepicker('setDate','+'+self.c1+'d').on('changeDate', (e) => {self.fechaGet[0] = e.date; self.dateChange();}).keydown(false);
     
   $("#datepicker2" ).datepicker({daysOfWeekDisabled: self.calendarArray2,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c2+'d'})
   $("#datepicker2" ).datepicker('setDate','+'+self.c2+'d').on('changeDate', (e) => {self.fechaGet[1] = e.date; self.dateChange();}).keydown(false);

   $("#datepicker3" ).datepicker({daysOfWeekDisabled: self.calendarArray3,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c3+'d'})
   $("#datepicker3" ).datepicker('setDate','+'+self.c3+'d').on('changeDate', (e) => {self.fechaGet[2] = e.date; self.dateChange();}).keydown(false);
  },150)  
}
}
    }
    // Viaje Regional
    //Una parada
    if (this.session.route.id == 1) {
      if (this.trips.length == 1){
    
        id_src1 = this.trips[0].id_src;
        id_dst1 = this.trips[0].id_dst;
        this.bloc1 = true;
    
    
        if(id_src1.id == undefined){this.constStop=false;this.stopNumErr = 1}
        else if (id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
        
        else ( this.constStop = null , this.bloc1 = null)
        
        for (const key in getSrcs) {
          const position = getSrcs[key].id
          if (position == id_src1.id) { this.keyDst1 = toInteger(key)}
          if (position == id_dst1.id) { this.keySrc1 = toInteger(key)}
        }
        if(this.keySrc1 < this.keyDst1){this.bloqueoCalendario1 = false;this.calendarArray1 = [1, 3, 4, 6]}
        if(this.keySrc1 > this.keyDst1){this.bloqueoCalendario1 = true;this.calendarArray1 = [0, 2, 3, 5] } 
        
        if(this.bloqueoCalendario1 == true){ 
          if(this.calendar == 1 || this.calendar == 4 || this.calendar == 6){this.c1 = 1, this.cd1 = 0}
        else if(this.calendar == 3){this.c1 = 2, this.cd1 =1}
        else(this.c1 = 0);
      } 
        if(this.bloqueoCalendario1 == false){
        if(this.calendar == 0 || this.calendar == 3 || this.calendar == 5){this.c1 = 1, this.cd1 = 0}
        else if(this.calendar == 2){this.c1 = 2 , this.cd1 = 1}
        else(this.c1=0);
      }
      let self = this;
      
     if(this.bloqueoCalendario1 != null){
       setTimeout(function () {
        $("#datepicker1" ).datepicker("destroy")
        $("#datepicker1" ).datepicker({daysOfWeekDisabled: self.calendarArray1,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.cd1+'d'})
        $("#datepicker1" ).datepicker('setDate','+'+self.c1+'d').on('changeDate', (e) => {self.fechaGet[0] = e.date; self.dateChange();}).keydown(false);
      },1000)  
     }
    }
    
    
    
      //Dos paradas
      if (this.trips.length == 2){
        id_src1 = this.trips[0].id_src;
        id_dst1 = this.trips[0].id_dst;
        id_dst2 = this.trips[1].id_dst;
        id_src2 = this.trips[1].id_src;
        this.bloc1 = true;
        this.bloc2 = true;
    
        if(id_src1.id == undefined){this.constStop=false;this.stopNumErr = 1}
        else if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
        else if(id_src2.id == undefined){this.constStop = false; this.stopNumErr = 2}
        else if(id_dst2.id == undefined || id_dst2.id == id_src2.id){this.constStop = true; this.stopNumErr = 2}
        else (this.constStop = null , this.bloc1 = null , this.bloc2 = null)
    
        for (const key in getSrcs) {
          const position = getSrcs[key].id
          if (position == id_src1.id) { this.keyDst1 = toInteger(key)}
          if (position == id_dst1.id) { this.keySrc1 = toInteger(key)}
          if (position == id_src2.id) { this.keyDst2 = toInteger(key)}
          if (position == id_dst2.id) { this.keySrc2 = toInteger(key)}
        }
        if(this.keySrc1 < this.keyDst1){this.bloqueoCalendario1 = false;this.calendarArray1 = [1, 3, 4, 6]}
        if(this.keySrc1 > this.keyDst1){this.bloqueoCalendario1 = true;this.calendarArray1 =  [0, 2, 3, 5]} 
        if(this.keySrc2 < this.keyDst2){this.bloqueoCalendario2 = false;this.calendarArray2 = [1, 3, 4, 6]}
        if(this.keySrc2 > this.keyDst2){this.bloqueoCalendario2 = true;this.calendarArray2 =  [0, 2, 3, 5]} 
        
        if(this.bloqueoCalendario1 == true){ 
        if(this.calendar == 1 || this.calendar == 4 || this.calendar == 6){this.c1 = 1, this.cd1 = 0}
        else if(this.calendar == 3){this.c1 = 2, this.cd1 =1}
        else(this.c1 = 0, this.cd1 = 0);
      } 
        if(this.bloqueoCalendario1 == false){
        if(this.calendar == 0 || this.calendar == 3 || this.calendar == 5){this.c1 = 1, this.cd1 = 0}
        else if(this.calendar == 2){this.c1 = 2 , this.cd1 = 1}
        else(this.c1=0,  this.cd1 = 0);
      }
      if(this.bloqueoCalendario2 == true){ 
        
        if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 1}
        else if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 2}
    } 
      if(this.bloqueoCalendario2 == false){
        if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 2}
        else if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 1}
    }
      let self = this;
      
     if(this.bloqueoCalendario2 != null){
       setTimeout(function () {
        $("#datepicker1" ).datepicker("destroy")
        $("#datepicker2" ).datepicker("destroy")
    
        $("#datepicker1" ).datepicker({daysOfWeekDisabled: self.calendarArray1,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c1+'d'})
        $("#datepicker1" ).datepicker('setDate','+'+self.c1+'d').on('changeDate', (e) => {self.fechaGet[0] = e.date; self.dateChange();}).keydown(false);
      
       $("#datepicker2" ).datepicker({daysOfWeekDisabled: self.calendarArray2,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c2+'d'})
       $("#datepicker2" ).datepicker('setDate','+'+self.c2+'d').on('changeDate', (e) => {self.fechaGet[1] = e.date; self.dateChange();}).keydown(false);
      },100)  
     } 
    }
        //Tres paradas
        if (this.trips.length == 3){
          id_src1 = this.trips[0].id_src;
          id_dst1 = this.trips[0].id_dst;
          id_dst2 = this.trips[1].id_dst;
          id_src2 = this.trips[1].id_src;
          id_dst3 = this.trips[2].id_dst;
          id_src3 = this.trips[2].id_src;
          this.bloc1 = true;
          this.bloc2 = true;
          this.bloc3 = true;
    
        if(id_src1.id == undefined){this.constStop=false;this.stopNumErr = 1}
        else if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
        else if(id_src2.id == undefined){this.constStop = false; this.stopNumErr = 2}
        else if(id_dst2.id == undefined || id_dst2.id == id_src2.id){this.constStop = true; this.stopNumErr = 2}
        else if(id_src3.id == undefined){this.constStop = false; this.stopNumErr = 3}
        else if(id_dst3.id == undefined || id_dst3.id == id_src3.id){this.constStop = true; this.stopNumErr = 3}
        else (this.constStop = null , this.bloc1 = null , this.bloc2 = null , this.bloc3 = null)
    
        for (const key in getSrcs) {
          const position = getSrcs[key].id
          if (position == id_src1.id) { this.keyDst1 = toInteger(key)}
          if (position == id_dst1.id) { this.keySrc1 = toInteger(key)}
          if (position == id_src2.id) { this.keyDst2 = toInteger(key)}
          if (position == id_dst2.id) { this.keySrc2 = toInteger(key)}
          if (position == id_src3.id) { this.keyDst3 = toInteger(key)}
          if (position == id_dst3.id) { this.keySrc3 = toInteger(key)}
        }
        if(this.keySrc1 < this.keyDst1){this.bloqueoCalendario1 = false;this.calendarArray1 = [1, 3, 4, 6]}
        if(this.keySrc1 > this.keyDst1){this.bloqueoCalendario1 = true;this.calendarArray1 =  [0, 2, 3, 5]} 
        if(this.keySrc2 < this.keyDst2){this.bloqueoCalendario2 = false;this.calendarArray2 = [1, 3, 4, 6]}
        if(this.keySrc2 > this.keyDst2){this.bloqueoCalendario2 = true;this.calendarArray2 =  [0, 2, 3, 5]} 
        if(this.keySrc3 < this.keyDst3){this.bloqueoCalendario3 = false;this.calendarArray3 = [1, 3, 4, 6]}
        if(this.keySrc3 > this.keyDst3){this.bloqueoCalendario3 = true;this.calendarArray3 =  [0, 2, 3, 5]} 

        if(this.bloqueoCalendario1 == true){ 
          if(this.calendar == 1 || this.calendar == 4 || this.calendar == 6){this.c1 = 1, this.cd1 = 0}
        else if(this.calendar == 3){this.c1 = 2, this.cd1 =1}
        else(this.c1 = 0, this.cd1 = 0);
      } 
        if(this.bloqueoCalendario1 == false){
        if(this.calendar == 0 || this.calendar == 3 || this.calendar == 5){this.c1 = 1, this.cd1 = 0}
        else if(this.calendar == 2){this.c1 = 2 , this.cd1 = 1}
        else(this.c1=0,  this.cd1 = 0);
      }
      if(this.bloqueoCalendario2 == true){ 
        
        if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 1}
        else if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 2}
    } 
      if(this.bloqueoCalendario2 == false){
        if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 2}
        else if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 1}
    } this.calendar2 = this.calendar - this.c2;

    if(this.bloqueoCalendario3 == true){ 
      if(this.bloqueoCalendario2 == true && this.calendar2 == 3){this.c3 = this.c2 + 3}
      else if(this.bloqueoCalendario2 == true){this.c3 = this.c2 + 2}
      else if(this.bloqueoCalendario2 == false && this.calendar2 == 3){this.c3 = this.c2 + 3}
      else if(this.bloqueoCalendario2 == false){this.c3 = this.c2 + 1}
  } 
    if(this.bloqueoCalendario3 == false){
      if(this.bloqueoCalendario2 == true && this.calendar2 == 2){this.c3 = this.c2 + 3}
      else if(this.bloqueoCalendario2 == true){this.c3 = this.c2 + 1}
      else if(this.bloqueoCalendario2 == false && this.calendar2 == 2){this.c3 = this.c2 + 3}
      else if(this.bloqueoCalendario2 == false){this.c3 = this.c2 + 2}
  } 
      let self = this;
      if(this.bloqueoCalendario3 !=null){
       setTimeout(function () {
        $("#datepicker1" ).datepicker("destroy")
        $("#datepicker2" ).datepicker("destroy")
        $("#datepicker3" ).datepicker("destroy")
    
        $("#datepicker1" ).datepicker({daysOfWeekDisabled: self.calendarArray1,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c1+'d'})
        $("#datepicker1" ).datepicker('setDate','+'+self.c1+'d').on('changeDate', (e) => {self.fechaGet[0] = e.date; self.dateChange();}).keydown(false);
         
       $("#datepicker2" ).datepicker({daysOfWeekDisabled: self.calendarArray2,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c2+'d'})
       $("#datepicker2" ).datepicker('setDate','+'+self.c2+'d').on('changeDate', (e) => {self.fechaGet[1] = e.date; self.dateChange();}).keydown(false);
    
       $("#datepicker3" ).datepicker({daysOfWeekDisabled: self.calendarArray3,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c3+'d'})
       $("#datepicker3" ).datepicker('setDate','+'+self.c3+'d').on('changeDate', (e) => {self.fechaGet[2] = e.date; self.dateChange();}).keydown(false);
      },150)  
    }
    }
 
    //Cuatro paradas
    if (this.trips.length == 4){
          id_src1 = this.trips[0].id_src;
          id_dst1 = this.trips[0].id_dst;
          id_dst2 = this.trips[1].id_dst;
          id_src2 = this.trips[1].id_src;
          id_dst3 = this.trips[2].id_dst;
          id_src3 = this.trips[2].id_src;
          id_src4 = this.trips[3].id_src;
          id_dst4 = this.trips[3].id_dst;
          this.bloc1 = true;
          this.bloc2 = true;
          this.bloc3 = true;
          this.bloc4 = true;
        if(id_src1.id == undefined){this.constStop=false;this.stopNumErr = 1}
        else if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
        else if(id_src2.id == undefined){this.constStop = false; this.stopNumErr = 2}
        else if(id_dst2.id == undefined || id_dst2.id == id_src2.id){this.constStop = true; this.stopNumErr = 2}
        else if(id_src3.id == undefined){this.constStop = false; this.stopNumErr = 3}
        else if(id_dst3.id == undefined || id_dst3.id == id_src3.id){this.constStop = true; this.stopNumErr = 3}
        else if(id_src4.id == undefined){this.constStop = false; this.stopNumErr = 4}
        else if(id_dst4.id == undefined || id_src4.id == id_dst4.id){this.constStop = true; this.stopNumErr = 4}
        else (this.constStop = null , this.bloc1 = null , this.bloc2 = null , this.bloc3 = null, this.bloc4 = null)
    
        for (const key in getSrcs) {
          const position = getSrcs[key].id
          if (position == id_src1.id) { this.keyDst1 = toInteger(key)}
          if (position == id_dst1.id) { this.keySrc1 = toInteger(key)}
          if (position == id_src2.id) { this.keyDst2 = toInteger(key)}
          if (position == id_dst2.id) { this.keySrc2 = toInteger(key)}
          if (position == id_src3.id) { this.keyDst3 = toInteger(key)}
          if (position == id_dst3.id) { this.keySrc3 = toInteger(key)}
          if (position == id_src4.id) { this.keyDst4 = toInteger(key)}
          if (position == id_dst4.id) { this.keySrc4 = toInteger(key)}
        }
        if(this.keySrc1 < this.keyDst1){this.bloqueoCalendario1 = false;this.calendarArray1 = [1, 3, 4, 6]}
        if(this.keySrc1 > this.keyDst1){this.bloqueoCalendario1 = true;this.calendarArray1 =  [0, 2, 3, 5]} 
        if(this.keySrc2 < this.keyDst2){this.bloqueoCalendario2 = false;this.calendarArray2 = [1, 3, 4, 6]}
        if(this.keySrc2 > this.keyDst2){this.bloqueoCalendario2 = true;this.calendarArray2 =  [0, 2, 3, 5]} 
        if(this.keySrc3 < this.keyDst3){this.bloqueoCalendario3 = false;this.calendarArray3 = [1, 3, 4, 6]}
        if(this.keySrc3 > this.keyDst3){this.bloqueoCalendario3 = true;this.calendarArray3 =  [0, 2, 3, 5]} 
        if(this.keySrc4 < this.keyDst4){this.bloqueoCalendario4 = false;this.calendarArray4 = [1, 3, 4, 6]}
        if(this.keySrc4 > this.keyDst4){this.bloqueoCalendario4 = true;this.calendarArray4 =  [0, 2, 3, 5]}  

        if(this.bloqueoCalendario1 == true){ 
          if(this.calendar == 1 || this.calendar == 4 || this.calendar == 6){this.c1 = 1}
        else if(this.calendar == 3){this.c1 = 2}
        else(this.c1 = 0);
      } 
        if(this.bloqueoCalendario1 == false){
        if(this.calendar == 0 || this.calendar == 3 || this.calendar == 5){this.c1 = 1}
        else if(this.calendar == 2){this.c1 = 2}
        else(this.c1=0);
      }
      if(this.bloqueoCalendario2 == true){ 
        
        if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 1}
        else if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 2}
    } 
      if(this.bloqueoCalendario2 == false){
        if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == true){this.c2 = this.c1 + 2}
        else if(this.calendar == 1 && this.bloqueoCalendario1 == true){this.c2 = this.c1 + 3}
        else if(this.bloqueoCalendario1 == false){this.c2 = this.c1 + 1}
    } this.calendar2 = this.calendar - this.c2;

    if(this.bloqueoCalendario3 == true){ 
      if(this.bloqueoCalendario2 == true && this.calendar2 == 3){this.c3 = this.c2 + 3}
      else if(this.bloqueoCalendario2 == true){this.c3 = this.c2 + 2}
      else if(this.bloqueoCalendario2 == false && this.calendar2 == 3){this.c3 = this.c2 + 3}
      else if(this.bloqueoCalendario2 == false){this.c3 = this.c2 + 1}
  } 
    if(this.bloqueoCalendario3 == false){
      if(this.bloqueoCalendario2 == true && this.calendar2 == 2){this.c3 = this.c2 + 3}
      else if(this.bloqueoCalendario2 == true){this.c3 = this.c2 + 1}
      else if(this.bloqueoCalendario2 == false && this.calendar2 == 2){this.c3 = this.c2 + 3}
      else if(this.bloqueoCalendario2 == false){this.c3 = this.c2 + 2}
  } this.calendar3 = this.calendar - this.c3;

  if(this.bloqueoCalendario4 == true){ 
    if(this.bloqueoCalendario3 == true && this.calendar3 == 2){this.c4 = this.c3 + 3}
    else if(this.bloqueoCalendario3 == true){this.c4 = this.c3 + 2}
    else if(this.bloqueoCalendario3 == false && this.calendar3 == 2){this.c4 = this.c3 + 2}
    else if(this.bloqueoCalendario3 == false){this.c4 = this.c3 + 1}
} 
  if(this.bloqueoCalendario4 == false){
    if(this.bloqueoCalendario3 == true && this.calendar3 == 2){this.c4 = this.c3 + 3}
    else if(this.bloqueoCalendario3 == true){this.c4 = this.c3 + 1}
    else if(this.bloqueoCalendario3 == false && this.calendar3 == 2){this.c4 = this.c3 + 3}
    else if(this.bloqueoCalendario3 == false){this.c4 = this.c3 + 2}
} 
      let self = this;
      if(this.bloqueoCalendario4 !=null){
       setTimeout(function () {
        $("#datepicker1" ).datepicker("destroy")
        $("#datepicker2" ).datepicker("destroy")
        $("#datepicker3" ).datepicker("destroy")
        $("#datepicker4" ).datepicker("destroy")

        $("#datepicker1" ).datepicker({daysOfWeekDisabled: self.calendarArray1,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c1+'d'})
        $("#datepicker1" ).datepicker('setDate','+'+self.c1+'d').on('changeDate', (e) => {self.fechaGet[0] = e.date; self.dateChange();}).keydown(false);
         
       $("#datepicker2" ).datepicker({daysOfWeekDisabled: self.calendarArray2,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c2+'d'})
       $("#datepicker2" ).datepicker('setDate','+'+self.c2+'d').on('changeDate', (e) => {self.fechaGet[1] = e.date; self.dateChange();}).keydown(false);
    
       $("#datepicker3" ).datepicker({daysOfWeekDisabled: self.calendarArray3,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c3+'d'})
       $("#datepicker3" ).datepicker('setDate','+'+self.c3+'d').on('changeDate', (e) => {self.fechaGet[2] = e.date; self.dateChange();}).keydown(false);
      
       $("#datepicker4" ).datepicker({daysOfWeekDisabled: self.calendarArray4,language: 'es',format: "dd/mm/yyyy",autoclose: true, startDate: '+'+self.c4+'d'})
       $("#datepicker4" ).datepicker('setDate','+'+self.c4+'d').on('changeDate', (e) => {self.fechaGet[3] = e.date; self.dateChange();}).keydown(false);
      },150)  
    }
  }
}

    this.dateChange();
    this.preflight();

  }
  public onCreateTrip(round: boolean) {
    let index;
    let tr: Trip = new Trip(0, 0, new Date());

    this.constStop = true
      this.trips.push(tr);
      index = this.trips.indexOf(tr, 0);
    this.dateChange();
    this.createInstance();
    this.numStops++;
    this.maxStop();
    this.onChangeStop(false, this.trips[0]);


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
    this.flagOrigin = null;
    this.numStops--;
    this.onChangeStop(false, this.trips[0]);
    this.dateChange();
    this.createInstance();
    this.maxStop();
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
    this.a1('pasajeros'); this.a1('inicio');
    this.a1('fin'); this.a1('clase'); this.a1('o4');
    this.a1('origen1');this.a1('origen2'); 
    this.a1('origen3');this.a1('origen4'); 
    this.a1('datepicker1'); this.a1('datepicker2');
    this.a1('datepicker3'); this.a1('datepicker4');
    this.a1('destino1');this.a1('destino2'); 
    this.a1('destino3');this.a1('destino4');
    //this.dateChange();
    // if(this.session.query.src == null){this.last_failure_motive = "Elige un origen";this.a1('origen','orange');return false;}
    // if(this.session.query.dst == null){this.last_failure_motive = "Elige un destino";this.a1('destino','orange');return false;}
    if (this.session.route.pick_class && this.session.query.class == null) { this.flagDisabled = true; this.last_failure_motive = "Elige una clase."; this.a1('clase', 'orange'); this.step1 = this.translate.instant('Step1-P66'); return true; }
    //if (this.trips[0].id_src == null || this.trips[0].id_src == 0) { this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.a1('origen', 'orange'); this.step1 = this.translate.instant('Step1-P67'); return true; }
    //if (this.trips.length > 1 && this.flagOrigin) { this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P71'); this.a1('origen', 'orange'); return true; }
    //if (this.trips[0].id_dst == null || this.trips[0].id_dst == 0) { this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.a1('destino1', 'orange'); this.step1 = this.translate.instant('Step1-P68'); return true; }
    var now_dt: Date = new Date();
   // if (this.trips[0].start.getTime() < now_dt.getTime()) { this.flagDisabled = true; this.last_failure_motive = "Elige inicio válido"; this.a1('fecha1', 'orange'); this.step1 = this.translate.instant('Step1-P69'); return true; }
    if (this.constStop == false) { this.a1('origen' + this.stopNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P67'); return true; }
    if (this.constStop == true) { this.a1('destino' + this.stopNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.step1 = this.translate.instant('Step1-P68'); return true; }
   
    if (this.constDate) { this.a1('datepicker' + this.dateNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige una fecha"; this.step1 = this.translate.instant('Step1-P70'); return true; }
   
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
    if (this.session.query.getTotalPassengers() <= 0) { this.flagDisabled = null; this.last_failure_motive = "Elige pasajeros."; this.a1('pasajeros', 'orange'); return true; }
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
      // let aq: AvailabilityQuery = this.session.query.toAvailabilityQuery(this.session.route);
      // var a = this.model.getRouteScheduleAvailable(this.session.route.id, aq);
      // this.session.preflight = a.subscribe(((r: Response<Schedule>) => {
      //   this.session.schedule = r.data;
      //   // console.log(this.session.schedule)
      // }));
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
    //this.dateChange();
    this.createInstance();

    if (value && this.trips2.length == 0) {
      let trip = new Trip(0, 0, new Date());
      this.trips2.push(trip);
      //this.session.query.trips.push(trip);
      this.trips2[0].id_src = this.trips[this.trips.length - 1].id_dst;
      this.maxStop();
      
    }
    else if (value) {
      this.trips2[0].id_src = this.trips[this.trips.length - 1].id_dst;
    }
    else {
      if(this.trips2.length > 1){
        this.numStops = this.numStops - (this.trips2.length - 1); 
        
      } this.maxStop();
      this.trips2 = [];
      this.session.query.trips = [];
    }
    this.dateChange();
    this.onChangeStop(false, this.trips[0])
  }
  isRegional(route: Route2): boolean {
    // console.log(route.name);
    return (route.name.toLowerCase() == "regional");
  }
  public maxStop() {

    if (this.route.max_stops <= this.numStops) { this.tripMaxStop = false }
    else (this.tripMaxStop = true)
    this.onChangeStop(false, this.trips[0]);
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