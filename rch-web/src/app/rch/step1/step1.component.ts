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
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


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
  public stopNumErr: number; public dateNumErr: number;
  public radio: boolean = null;
  public keySrc: number;
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
  // public stops:TrainStop[] = this.stops;
  ngOnInit() {
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
      //DatePicker fecha 1
      $("#datepicker1").datepicker({
        language: 'es', format: "dd/mm/yyyy", autoclose: true, defaultDate: "+1d", startDate: "+1d"
      }).on('changeDate', (e) => {
      self.fechaGet[0] = e.date; self.dateChange();
      }).keydown(false);
      //DatePicker fecha 2
      $("#datepicker2").datepicker({
        language: 'es', format: "dd/mm/yyyy", autoclose: true, defaultDate: "+1d", startDate: "+1d"
      }).on('changeDate', (e) => {
      self.fechaGet[1] = e.date; self.dateChange();
      }).keydown(false);
      //DatePicker fecha 3
      $("#datepicker3").datepicker({
        language: 'es', format: "dd/mm/yyyy", autoclose: true, defaultDate: "+1d", startDate: "+1d"
      }).on('changeDate', (e) => {
      self.fechaGet[2] = e.date; self.dateChange();
      }).keydown(false);
      //Regreso DatePicker fecha 1
      $("#datepicker4").datepicker({
        language: 'es', format: "dd/mm/yyyy", autoclose: true, defaultDate: "+1d", startDate: "+1d"
      }).on('changeDate', (e) => {
      self.fechaGet[3] = e.date; self.dateChange();
      }).keydown(false);
      //Regreso DatePicker fecha 2
      $("#datepicker5").datepicker({
        language: 'es', format: "dd/mm/yyyy", autoclose: true, defaultDate: "+1d", startDate: "+1d"
      }).on('changeDate', (e) => {
      self.fechaGetBack[0] = e.date; self.dateChange();
      }).keydown(false);
      //Regreso DatePicker fecha 3
      $("#datepicker6").datepicker({
        language: 'es', format: "dd/mm/yyyy", autoclose: true, defaultDate: "+1d", startDate: "+1d"
      }).on('changeDate', (e) => {
      self.fechaGetBack[1] = e.date; self.dateChange();
      }).keydown(false);
      $("#datepicker7").datepicker({
        language: 'es', format: "dd/mm/yyyy",
        autoclose: true, defaultDate: "+1d", startDate: "+1d"
      }).on('changeDate', (e) => {
      self.fechaGetBack[2] = e.date; self.dateChange();
      }).keydown(false);
      $("#datepicker8").datepicker({
        language: 'es', format: "dd/mm/yyyy",
        autoclose: true, defaultDate: "+1d", startDate: "+1d"
      }).on('changeDate', (e) => {
      self.fechaGetBack[3] = e.date; self.dateChange();
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
          currDate[i] = d.getDate() + 1; currMonth[i] = d.getMonth(); currYear[i] = d.getFullYear(); this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]); mes = this.fechaGet[i].getMonth() + 1; this.trips[i].start = this.fechaGet[i]; this.dateStr[i] = this.fechaGet[i].getDate() + "/" + mes + "/" + currYear;
        } else {
          this.trips[i].start = this.fechaGet[i]; currDate[i] = this.fechaGet[i].getDate(); currMonth[i] = this.fechaGet[i].getMonth(); currYear[i] = this.fechaGet[i].getFullYear(); mes = currMonth[i] + 1; this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i];
        }
      }
      /////////////////////

      if (i > 0) {
        if (this.fechaGet[i] == undefined) {
        currDate[i] = this.fechaGet[i - 1].getDate(); currMonth[i] = this.fechaGet[i - 1].getMonth(); currYear[i] = this.fechaGet[i - 1].getFullYear(); mes = currMonth[i] + 1; this.fechaGet[i] = new Date(currYear[i], currMonth[i], currDate[i]); this.trips[i].start = this.fechaGet[i]; this.dateStr[i] = currDate[i] + "/" + mes + "/" + currYear[i];
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
    if (this.radio) {
      var dateBack = null

      for (const key in this.trips) {
        var pos = key
      } dateBack = this.trips[pos].start

      for (let j = 0; j < this.trips2.length; j++) {

        if (j == 0) {
          if (this.fechaGetBack[j] == undefined) { currDate[j] = dateBack.getDate(); currMonth[j] = dateBack.getMonth(); currYear[j] = dateBack.getFullYear(); mes = currMonth[j] + 1; this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; this.dateStrBack[j] = currDate + "/" + mes + "/" + currYear; }
          //////////////
          if (this.fechaGetBack[j] != undefined) {
            if (dateBack.getDate() < this.fechaGetBack[j].getDate() && dateBack.getMonth() <= this.fechaGetBack[j].getMonth() && dateBack.getFullYear() <= this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
            /////////////////

            else if (dateBack.getDate() >= this.fechaGetBack[j].getDate()
              && dateBack.getMonth() < this.fechaGetBack[j].getMonth()) {
              if (dateBack.getFullYear() <= this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
              if (dateBack.getFullYear() > this.fechaGetBack[j].getFullYear()) { currDate[j] = dateBack.getDate(), currMonth[j] = dateBack.getMonth(), currYear[j] = dateBack.getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null }
            }
            ////////////////
            else if (dateBack.getDate() >= this.fechaGetBack[j].getDate() && dateBack.getMonth() >= this.fechaGetBack[j].getMonth()) {
              if (dateBack.getFullYear() < this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
              if (dateBack.getFullYear() >= this.fechaGetBack[j].getFullYear()) { currDate[j] = dateBack.getDate(), currMonth[j] = dateBack.getMonth(), currYear[j] = dateBack.getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null }
            }
            ////////////////
            else if (dateBack.getDate() <= this.fechaGetBack[j].getDate() && dateBack.getMonth() >= this.fechaGetBack[j].getMonth()) {
              if (dateBack.getFullYear() < this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
              if (dateBack.getFullYear() >= this.fechaGetBack[j].getFullYear()) { currDate[j] = dateBack.getDate(), currMonth[j] = dateBack.getMonth(), currYear[j] = dateBack.getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null }
            }
            ////////////////
            else if (dateBack.getDate() <= this.fechaGetBack[j].getDate() && dateBack.getMonth() <= this.fechaGetBack[j].getMonth()) {
              if (dateBack.getFullYear() < this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
              if (dateBack.getFullYear() >= this.fechaGetBack[j].getFullYear()) { currDate[j] = dateBack.getDate(), currMonth[j] = dateBack.getMonth(), currYear[j] = dateBack.getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null }
            }
            ////////////////
            else (currDate[j] = dateBack.getDate(), currMonth[j] = dateBack.getMonth(), currYear[j] = dateBack.getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null);
          }
        }
        if (j > 0) {
          if (this.fechaGetBack[j] == undefined) { currDate[j] = this.fechaGetBack[j - 1].getDate(); currMonth[j] = this.fechaGetBack[j - 1].getMonth(); currYear[j] = this.fechaGetBack[j - 1].getFullYear(); mes = currMonth[j] + 1; this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; }
          //////////////
          if (this.fechaGetBack[j] != undefined) {
            if (this.fechaGetBack[j - 1].getDate() < this.fechaGetBack[j].getDate() && this.fechaGetBack[j - 1].getMonth() <= this.fechaGetBack[j].getMonth() && this.fechaGetBack[j - 1].getFullYear() <= this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
            /////////////////

            else if (this.fechaGetBack[j - 1].getDate() >= this.fechaGetBack[j].getDate() && this.fechaGetBack[j - 1].getMonth() < this.fechaGetBack[j].getMonth()) {
              if (this.fechaGetBack[j - 1].getFullYear() <= this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
              if (this.fechaGetBack[j - 1].getFullYear() > this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j - 1].getDate(), currMonth[j] = this.fechaGetBack[j - 1].getMonth(), currYear[j] = this.fechaGetBack[j - 1].getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null }
            }
            ////////////////
            else if (this.fechaGetBack[j - 1].getDate() >= this.fechaGetBack[j].getDate() && this.fechaGetBack[j - 1].getMonth() >= this.fechaGetBack[j].getMonth()) {
              if (this.fechaGetBack[j - 1].getFullYear() < this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
              if (this.fechaGetBack[j - 1].getFullYear() >= this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j - 1].getDate(), currMonth[j] = this.fechaGetBack[j - 1].getMonth(), currYear[j] = this.fechaGetBack[j - 1].getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null }
            }
            ////////////////
            else if (this.fechaGetBack[j - 1].getDate() <= this.fechaGetBack[j].getDate() && this.fechaGetBack[j - 1].getMonth() >= this.fechaGetBack[j].getMonth()) {
              if (this.fechaGetBack[j - 1].getFullYear() < this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
              if (this.fechaGetBack[j - 1].getFullYear() >= this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j - 1].getDate(), currMonth[j] = this.fechaGetBack[j - 1].getMonth(), currYear[j] = this.fechaGetBack[j - 1].getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null }
            }
            ////////////////
            else if (this.fechaGetBack[j - 1].getDate() <= this.fechaGetBack[j].getDate() && this.fechaGetBack[j - 1].getMonth() <= this.fechaGetBack[j].getMonth()) {
              if (this.fechaGetBack[j - 1].getFullYear() < this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j].getDate(); currMonth[j] = this.fechaGetBack[j].getMonth(); currYear[j] = this.fechaGetBack[j].getFullYear(); this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]); this.trips2[j].start = this.fechaGetBack[j]; mes = currMonth[j] + 1; this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j]; this.dateMYBack[j] = true; }
              if (this.fechaGetBack[j - 1].getFullYear() >= this.fechaGetBack[j].getFullYear()) { currDate[j] = this.fechaGetBack[j - 1].getDate(), currMonth[j] = this.fechaGetBack[j - 1].getMonth(), currYear[j] = this.fechaGetBack[j - 1].getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null }
            }
            ////////////////
            else (currDate[j] = this.fechaGetBack[j - 1].getDate(), currMonth[j] = this.fechaGetBack[j - 1].getMonth(), currYear[j] = this.fechaGetBack[j - 1].getFullYear(), mes = currMonth[j] + 1, this.fechaGetBack[j] = new Date(currYear[j], currMonth[j], currDate[j]), this.trips2[j].start = this.fechaGetBack[j], this.dateStrBack[j] = currDate[j] + "/" + mes + "/" + currYear[j], this.dateMYBack[j] = null);
          }
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

    ///////////Viaje de regreso//////////////
    if (this.radio) {

      if (this.trips2.length == 1) {
        if (this.dateMYBack[0] == null) { this.constBackDate = true; this.dateNumErr = 5; }
        else (this.constBackDate = null)
      }
      if (this.trips2.length == 2) {
        if (this.dateMYBack[0] == null) { this.constBackDate = true; this.dateNumErr = 5; }
        else if (this.dateMYBack[1] == null) { this.constBackDate = true; this.dateNumErr = 6; }
        else (this.constBackDate = null)
      }
      if (this.trips2.length == 3) {
        if (this.dateMYBack[0] == null) { this.constBackDate = true; this.dateNumErr = 5; }
        else if (this.dateMYBack[1] == null) { this.constBackDate = true; this.dateNumErr = 6; }
        else if (this.dateMYBack[2] == null) { this.constBackDate = true; this.dateNumErr = 7; }
        else (this.constBackDate = null)
      }
      if (this.trips2.length == 4) {
        if (this.dateMYBack[0] == null) { this.constBackDate = true; this.dateNumErr = 5; }
        else if (this.dateMYBack[1] == null) { this.constBackDate = true; this.dateNumErr = 6; }
        else if (this.dateMYBack[2] == null) { this.constBackDate = true; this.dateNumErr = 7; }
        else if (this.dateMYBack[3] == null) { this.constBackDate = true; this.dateNumErr = 8; }
        else (this.constBackDate = null)
      } this.onChangeStop(false, this.trips[0])
    }


  }
  public onChangeStop(round: boolean, tr: Trip) {
    
    let index;
    var id_dst1 = null; var id_dst2 = null; var id_dst3 = null; var id_dst4 = null;
    var id_src1 = null;
    var backId_dst1 = null; var backId_dst2 = null; var backId_dst3 = null; var backId_dst4 = null;
    var backId_src1 = null;
    var backId = null;
    var getSrcs = null; getSrcs = this.session.route.stops;
     id_src1 = this.trips[0].id_src;
    var getSrcslenngth = null; var getSrcs1lenngth = null;

    var getDsts1lenngth = null; var getDsts2lenngth = null; var getDsts3lenngth = null;

    for (const key in getSrcs) {
      const position = getSrcs[key].id
      if (position == id_src1.id) { this.keySrc = toInteger(key) }
    }
    getSrcslenngth = getSrcs.length - 1;
    if (getSrcslenngth == this.keySrc) { this.flagSrc = true }
    else if (this.keySrc == 0) { this.flagSrc = false }
    else (this.flagSrc = null)

    //express
    if (this.session.route.id == 2) {
      // Viaje de ida 
      if (this.trips.length == 1) {
        id_dst1 = this.trips[0].id_dst;

        if (id_dst1.id == id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else (this.constStop = null)
      }
      // Viaje ida con dos paradas

      if (this.trips.length == 2) {
        id_dst1 = this.trips[0].id_dst;
        id_dst2 = this.trips[1].id_dst;

        for (const keyD1 in getSrcs) {
          const position1 = getSrcs[keyD1].id
          if (position1 == id_dst1.id) { this.keyDst1 = toInteger(keyD1) }
        }
        getDsts1lenngth = getSrcs.length - 1;
        if (getDsts1lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
        else (this.flagDst1 = null)

        if (id_dst1.id == undefined || id_dst1.id == id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (id_dst2.id == undefined || id_dst2.id == id_src1.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.flagDst1 == true) { this.flagDst1 = null; this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == null && id_dst1.id <= id_src1.id && id_dst1.id <= id_dst2.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == null && id_dst1.id >= id_src1.id && id_dst1.id >= id_dst2.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == false && id_dst2.id <= id_dst1.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.flagSrc == true && id_dst2.id <= id_dst1.id) { this.constStop = true; this.stopNumErr = 2 }
        else (this.constStop = null)

      }

      // Viaje ida con tres paradas

      if (this.trips.length == 3) {
        id_dst1 = this.trips[0].id_dst;
        id_dst2 = this.trips[1].id_dst;
        id_dst3 = this.trips[2].id_dst;

        for (const key in getSrcs) {
          const position = getSrcs[key].id
          if (position == id_dst1.id) { this.keyDst1 = toInteger(key) }
          if (position == id_dst2.id) { this.keyDst2 = toInteger(key) }
          if (position == id_dst3.id) { this.keyDst3 = toInteger(key) }
        }
        getDsts1lenngth = getSrcs.length - 1;
        if (getDsts1lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
        else (this.flagDst1 = null)
        if (getDsts1lenngth == this.keyDst2 || this.keyDst2 == 0) { this.flagDst2 = true }
        else (this.flagDst2 = null)
        if (getDsts1lenngth == this.keyDst3 || this.keyDst3 == 0) { this.flagDst3 = null }
        else (this.flagDst3 = true)

        var kMas = this.keyDst1 + 1;
        var kMenos = this.keyDst1 - 1;
        if (this.keySrc == kMas || this.keySrc == kMenos) { this.keyFlag1 = true }
        else (this.keyFlag1 = null)

        if (this.flagSrc == null) { this.flagOrigin = true; }
        else if (id_dst1.id == undefined || id_dst1.id == id_src1.id) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 1 }
        else if (id_dst2.id == undefined || id_dst2.id == id_src1.id) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 2 }
        else if (id_dst3.id == undefined || id_dst3.id == id_src1.id) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 3 }
        else if (this.flagDst1 == true) { this.flagOrigin = null; this.flagDst1 = null; this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagDst2 == true) { this.flagOrigin = null; this.flagDst2 = null; this.constStop = true; this.stopNumErr = 2 }
      //  else if (this.flagDst3 == true) { this.flagOrigin = null; this.flagDst3 = null; this.constStop = true; this.stopNumErr = 3 }
        else if (this.flagSrc == true) {
          if (id_dst2.id >= id_dst1.id && this.keyFlag1 == null) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 1 }
          else if (id_dst2.id >= id_dst1.id && this.keyFlag1 == true) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 2 }
          else if (id_dst3.id >= id_dst2.id) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 2 }
          else (this.flagOrigin = null, this.constStop = null)
        }
        else if (this.flagSrc == false) {
          if (id_dst2.id <= id_dst1.id && this.keyFlag1 == null) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 1 }
          else if (id_dst2.id <= id_dst1.id && this.keyFlag1 == true) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 2 }
          else if (id_dst3.id <= id_dst2.id) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 2 }
          else (this.constStop = null, this.flagOrigin = null)
        }
        else (this.constStop = null, this.flagOrigin = null)


      }

      ///////////Viaje de regreso//////////////
      if (this.radio) {


        for (const key in this.trips) { var pos = key } backId = this.trips[pos].id_dst
        backId_src1 = this.trips2[0].id_src;


        for (const key in getSrcs) {
          const position = getSrcs[key].id
          if (position == backId_src1.id) { this.keySrcBack = toInteger(key) }
        }
        getSrcslenngth = getSrcs.length - 1;
        if (getSrcslenngth == this.keySrcBack) { this.flagSrcBack = true }
        else if (this.keySrcBack == 0) { this.flagSrcBack = false }
        else (this.flagSrcBack = null)
        //Viaje de regreso con una parada
        if (this.trips2.length == 1) {
          backId_dst1 = this.trips2[0].id_dst;
          if (backId_src1 == undefined) { this.constBackOrigin = true; }
          else if (backId_src1.id != backId.id) { this.constBackOrigin = false; }
          else if (backId_dst1.id == undefined) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst1.id != id_src1.id) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = false; }
          else { this.constBackStop = null; this.constBackOrigin = null; }
        }
        //Viaje de regreso con dos paradas
        if (this.trips2.length == 2) {
          backId_dst1 = this.trips2[0].id_dst;
          backId_dst2 = this.trips2[1].id_dst;

          for (const keyD1 in getSrcs) {
            const position1 = getSrcs[keyD1].id
            if (position1 == backId_dst1.id) { this.keyDstBack1 = toInteger(keyD1) }
          }

          getDsts1lenngth = getSrcs.length - 1;
          if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
          else (this.flagDstBack1 = null)

          if (backId_src1.id == undefined) { this.constBackOrigin = true; }
          else if (backId_src1.id != backId.id) { this.constBackOrigin = false; }
          else if (backId_dst1.id == undefined) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (this.flagDstBack1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst2.id == undefined) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst2.id != id_src1.id) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = false; }
          else { this.constBackStop = null; this.constBackOrigin = null; }

        }
        //Viaje de regreso con tres paradas
        if (this.trips2.length == 3) {
          backId_dst1 = this.trips2[0].id_dst;
          backId_dst2 = this.trips2[1].id_dst;
          backId_dst3 = this.trips2[2].id_dst;

          for (const keyD1 in getSrcs) {
            const position1 = getSrcs[keyD1].id
            if (position1 == backId_dst1.id) { this.keyDstBack1 = toInteger(keyD1) }
          }
          getDsts1lenngth = getSrcs.length - 1;
          if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
          else (this.flagDstBack1 = null)

          for (const keyD2 in getSrcs) {
            const position2 = getSrcs[keyD2].id
            if (position2 == backId_dst2.id) { this.keyDstBack2 = toInteger(keyD2) }
          }
          getDsts2lenngth = getSrcs.length - 1;
          if (getDsts2lenngth == this.keyDstBack2 || this.keyDstBack2 == 0) { this.flagDstBack2 = true }
          else (this.flagDstBack2 = null)

          var kMas = this.keyDstBack1 + 1;
          var kMenos = this.keyDstBack1 - 1;
          if (this.keySrc == kMas || this.keySrc == kMenos) { this.keyFlag1 = true }
          else (this.keyFlag1 = null)


          if (backId_src1.id == undefined) { this.constBackOrigin = true; }
          else if (backId_src1.id != backId.id) { this.constBackOrigin = false; }
          else if (backId_dst1.id == undefined) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (this.flagDstBack1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst2.id == undefined) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
          else if (this.flagDstBack2 == true) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst3.id == undefined) { this.stopNumErr = 6; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst3.id != id_src1.id) { this.stopNumErr = 6; this.constBackOrigin = null; this.constBackStop = false; }

          else if (this.flagSrcBack == true) {
            if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
            else if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == null) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
            else (this.constBackOrigin = null, this.constBackStop = null)
          }
          else if (this.flagSrcBack == false) {
            if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
            else if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == null) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
            else (this.constBackOrigin = null, this.constBackStop = null)
          }
          else (this.constBackOrigin = null, this.constBackStop = null)
        }

      }

    }

    // Regional
    if (this.session.route.id == 1) {
      // Viaje de ida 
      if (this.trips.length == 1) {
        id_dst1 = this.trips[0].id_dst;

        if (id_dst1.id == id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else (this.constStop = null)
      }
      // Viaje de ida con una parada
      if (this.trips.length == 2) {
        id_dst1 = this.trips[0].id_dst;
        id_dst2 = this.trips[1].id_dst;

        for (const key in getSrcs) {
          const position2 = getSrcs[key].id
          if (position2 == id_src1.id) { this.keySrc = toInteger(key) }
          if (position2 == id_dst1.id) { this.keyDst1 = toInteger(key) }
        }
        getDsts1lenngth = getSrcs.length - 2;
        if (getDsts1lenngth == this.keySrc) { this.flagSrc = true }
        else if (this.keySrc == 1) { this.flagSrc = false }
        else (this.flagSrc = null)

        getDsts2lenngth = getSrcs.length - 1;
        if (getDsts2lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
        else (this.flagDst1 = null)



        for (const keyD2 in getSrcs) {
          const position2 = getSrcs[keyD2].id
          if (position2 == id_dst2.id) { this.keyDst2 = toInteger(keyD2) }
        }
        var kMas = this.keyDst2 + 1;
        var kMenos = this.keyDst2 - 1;
        if (this.keySrc == kMas || this.keySrc == kMenos) { this.keyFlag1 = true }
        else (this.keyFlag1 = null)

        if (id_dst1.id == undefined || id_dst1.id == id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagDst1 == true) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == false && id_dst1.id <= id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == true && id_dst1.id >= id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (id_dst2.id == undefined || id_dst2.id == id_src1.id) { this.constStop = true; this.stopNumErr = 2 }

        else if (this.keyFlag1 == true && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id >= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id > id_dst2.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id == id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }

        else if (id_src1.id < id_dst1.id && id_src1.id >= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }


        else if (id_src1.id > id_dst1.id && id_src1.id <= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == true && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id <= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id < id_dst2.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id == id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }

        else (this.constStop = null)
      }
      // Viaje de ida con dos paradas
      if (this.trips.length == 3) {
        id_dst1 = this.trips[0].id_dst;
        id_dst2 = this.trips[1].id_dst;
        id_dst3 = this.trips[2].id_dst;


        for (const key in getSrcs) {
          const position2 = getSrcs[key].id
          if (position2 == id_src1.id) { this.keySrc = toInteger(key) }
          if (position2 == id_dst1.id) { this.keyDst1 = toInteger(key) }
          if (position2 == id_dst2.id) { this.keyDst2 = toInteger(key) }
          if (position2 == id_dst3.id) { this.keyDst3 = toInteger(key) }
        }
        getSrcslenngth = getSrcs.length - 2;
        getSrcs1lenngth = getSrcs.length - 3;
        if (getSrcslenngth == this.keySrc || getSrcs1lenngth == this.keySrc) { this.flagSrc = true }
        else if (this.keySrc == 1 || this.keySrc == 2) { this.flagSrc = false }
        else (this.flagSrc = null)

        getDsts1lenngth = getSrcs.length - 1;
        if (getDsts1lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
        else (this.flagDst1 = null)

        getDsts2lenngth = getSrcs.length - 1;
        if (getDsts2lenngth == this.keyDst2 || this.keyDst2 == 0) { this.flagDst2 = true }
        else (this.flagDst2 = null)

        var kMas = this.keyDst2 + 1;
        var kMenos = this.keyDst2 - 1;
        if (this.keySrc == kMas || this.keySrc == kMenos) { this.keyFlag1 = true }
        else (this.keyFlag1 = null)
        var kMas1 = this.keyDst3 + 1;
        var kMenos1 = this.keyDst3 - 1;
        if (this.keySrc == kMas1 || this.keySrc == kMenos1) { this.keyFlag2 = true }
        else (this.keyFlag2 = null)

        if (id_dst1.id == undefined || id_dst1.id == id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagDst1 == true) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == false && id_dst1.id <= id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == true && id_dst1.id >= id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (id_dst2.id == undefined || id_dst2.id == id_src1.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.flagSrc == false && id_dst2.id <= id_src1.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.flagSrc == true && id_dst2.id >= id_src1.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (id_dst3.id == undefined || id_dst3.id == id_src1.id) { this.constStop = true; this.stopNumErr = 3 }

        else if (this.keyFlag1 == true && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id >= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id > id_dst2.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id == id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (id_src1.id < id_dst1.id && id_src1.id >= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }


        else if (id_src1.id > id_dst1.id && id_src1.id <= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == true && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id <= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id < id_dst2.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id == id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }

        else if (this.keyFlag2 == true && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id >= id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.keyFlag2 == null && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id > id_dst3.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag2 == null && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id == id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (id_src1.id < id_dst2.id && id_src1.id >= id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }


        else if (id_src1.id > id_dst2.id && id_src1.id <= id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.keyFlag2 == true && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id <= id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.keyFlag2 == null && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id < id_dst3.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag2 == null && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id == id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }

        else (this.constStop = null)
      }

      // Viaje de ida con tres paradas
      if (this.trips.length == 4) {
        id_dst1 = this.trips[0].id_dst;
        id_dst2 = this.trips[1].id_dst;
        id_dst3 = this.trips[2].id_dst;
        id_dst4 = this.trips[3].id_dst;


        for (const key in getSrcs) {
          const position2 = getSrcs[key].id
          if (position2 == id_src1.id) { this.keySrc = toInteger(key) }
          if (position2 == id_dst1.id) { this.keyDst1 = toInteger(key) }
          if (position2 == id_dst2.id) { this.keyDst2 = toInteger(key) }
          if (position2 == id_dst3.id) { this.keyDst3 = toInteger(key) }
          if (position2 == id_dst4.id) { this.keyDst4 = toInteger(key) }

        }
        getSrcslenngth = getSrcs.length - 2;
        getSrcs1lenngth = getSrcs.length - 3;
        if (getSrcslenngth == this.keySrc || getSrcs1lenngth == this.keySrc) { this.flagSrc = true }
        else if (this.keySrc == 1 || this.keySrc == 2) { this.flagSrc = false }
        else (this.flagSrc = null)

        getDsts1lenngth = getSrcs.length - 1;
        if (getDsts1lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
        else (this.flagDst1 = null)

        getDsts2lenngth = getSrcs.length - 1;
        if (getDsts2lenngth == this.keyDst2 || this.keyDst2 == 0) { this.flagDst2 = true }
        else (this.flagDst2 = null)

        getDsts3lenngth = getSrcs.length - 1;
        if (getDsts3lenngth == this.keyDst3 || this.keyDst3 == 0) { this.flagDst3 = true }
        else (this.flagDst3 = null)

        var kMas = this.keyDst2 + 1;
        var kMenos = this.keyDst2 - 1;
        if (this.keySrc == kMas || this.keySrc == kMenos) { this.keyFlag1 = true }
        else (this.keyFlag1 = null)
        var kMas1 = this.keyDst3 + 1;
        var kMenos1 = this.keyDst3 - 1;
        if (this.keySrc == kMas1 || this.keySrc == kMenos1) { this.keyFlag2 = true }
        else (this.keyFlag2 = null)
        var kMas2 = this.keyDst4 + 1;
        var kMenos2 = this.keyDst4 - 1;
        if (this.keySrc == kMas2 || this.keySrc == kMenos2) { this.keyFlag3 = true }
        else (this.keyFlag3 = null)


        if (id_dst1.id == undefined || id_dst1.id == id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagDst1 == true) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == false && id_dst1.id <= id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.flagSrc == true && id_dst1.id >= id_src1.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (id_dst2.id == undefined || id_dst2.id == id_src1.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.flagSrc == false && id_dst2.id <= id_src1.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.flagSrc == true && id_dst2.id >= id_src1.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (id_dst3.id == undefined || id_dst3.id == id_src1.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.flagSrc == false && id_dst3.id <= id_src1.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.flagSrc == true && id_dst3.id >= id_src1.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (id_dst4.id == undefined || id_dst4.id == id_src1.id) { this.constStop = true; this.stopNumErr = 7 }

        else if (this.keyFlag1 == true && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id >= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id > id_dst2.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id == id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (id_src1.id < id_dst1.id && id_src1.id >= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (id_src1.id > id_dst1.id && id_src1.id <= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == true && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id <= id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id < id_dst2.id) { this.constStop = true; this.stopNumErr = 1 }
        else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id == id_dst2.id) { this.constStop = true; this.stopNumErr = 2 }

        else if (this.keyFlag2 == true && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id >= id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.keyFlag2 == null && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id > id_dst3.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag2 == null && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id == id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (id_src1.id < id_dst2.id && id_src1.id >= id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (id_src1.id > id_dst2.id && id_src1.id <= id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.keyFlag2 == true && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id <= id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.keyFlag2 == null && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id < id_dst3.id) { this.constStop = true; this.stopNumErr = 2 }
        else if (this.keyFlag2 == null && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id == id_dst3.id) { this.constStop = true; this.stopNumErr = 3 }

        else if (this.keyFlag3 == true && id_src1.id < id_dst3.id && id_src1.id <= id_dst4.id && id_dst3.id >= id_dst4.id) { this.constStop = true; this.stopNumErr = 7 }
        else if (this.keyFlag3 == null && id_src1.id < id_dst3.id && id_src1.id <= id_dst4.id && id_dst3.id > id_dst4.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.keyFlag3 == null && id_src1.id < id_dst3.id && id_src1.id <= id_dst4.id && id_dst3.id == id_dst4.id) { this.constStop = true; this.stopNumErr = 7 }
        else if (id_src1.id < id_dst3.id && id_src1.id >= id_dst4.id) { this.constStop = true; this.stopNumErr = 7 }
        else if (id_src1.id > id_dst3.id && id_src1.id <= id_dst4.id) { this.constStop = true; this.stopNumErr = 7 }
        else if (this.keyFlag3 == true && id_src1.id > id_dst3.id && id_src1.id >= id_dst4.id && id_dst3.id <= id_dst4.id) { this.constStop = true; this.stopNumErr = 7 }
        else if (this.keyFlag3 == null && id_src1.id > id_dst3.id && id_src1.id >= id_dst4.id && id_dst3.id < id_dst4.id) { this.constStop = true; this.stopNumErr = 3 }
        else if (this.keyFlag3 == null && id_src1.id > id_dst3.id && id_src1.id >= id_dst4.id && id_dst3.id == id_dst4.id) { this.constStop = true; this.stopNumErr = 7 }


        else (this.constStop = null)
      }
      ///////////Viaje de regreso//////////////
      if (this.radio) {


        for (const key in this.trips) { var pos = key } backId = this.trips[pos].id_dst
        backId_src1 = this.trips2[0].id_src;


        for (const key in getSrcs) {
          const position = getSrcs[key].id
          if (position == backId_src1.id) { this.keySrcBack = toInteger(key) }
        }
        getSrcslenngth = getSrcs.length - 1;
        if (getSrcslenngth == this.keySrcBack) { this.flagSrcBack = true }
        else if (this.keySrcBack == 0) { this.flagSrcBack = false }
        else (this.flagSrcBack = null)
        //Viaje de regreso con una parada
        if (this.trips2.length == 1) {
          backId_dst1 = this.trips2[0].id_dst;
          if (backId_src1 == undefined) { this.constBackOrigin = true; }
          else if (backId_src1.id != backId.id) { this.constBackOrigin = false; }
          else if (backId_dst1.id == undefined) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst1.id != id_src1.id) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = false; }
          else { this.constBackStop = null; this.constBackOrigin = null; }
        }
        //Viaje de regreso con dos paradas
        if (this.trips2.length == 2) {
          backId_dst1 = this.trips2[0].id_dst;
          backId_dst2 = this.trips2[1].id_dst;

          for (const keyD1 in getSrcs) {
            const position1 = getSrcs[keyD1].id
            if (position1 == backId_dst1.id) { this.keyDstBack1 = toInteger(keyD1) }
          }

          getDsts1lenngth = getSrcs.length - 1;
          if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
          else (this.flagDstBack1 = null)

          if (backId_src1.id == undefined) { this.constBackOrigin = true; }
          else if (backId_src1.id != backId.id) { this.constBackOrigin = false; }
          else if (backId_dst1.id == undefined) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (this.flagDstBack1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst2.id == undefined) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst2.id != id_src1.id) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = false; }
          else { this.constBackStop = null; this.constBackOrigin = null; }

        }
        //Viaje de regreso con tres paradas
        if (this.trips2.length == 3) {
          backId_dst1 = this.trips2[0].id_dst;
          backId_dst2 = this.trips2[1].id_dst;
          backId_dst3 = this.trips2[2].id_dst;

          for (const keyD1 in getSrcs) {
            const position1 = getSrcs[keyD1].id
            if (position1 == backId_dst1.id) { this.keyDstBack1 = toInteger(keyD1) }
          }
          getDsts1lenngth = getSrcs.length - 1;
          if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
          else (this.flagDstBack1 = null)

          for (const keyD2 in getSrcs) {
            const position2 = getSrcs[keyD2].id
            if (position2 == backId_dst2.id) { this.keyDstBack2 = toInteger(keyD2) }
          }
          getDsts2lenngth = getSrcs.length - 1;
          if (getDsts2lenngth == this.keyDstBack2 || this.keyDstBack2 == 0) { this.flagDstBack2 = true }
          else (this.flagDstBack2 = null)

          var kMas = this.keyDstBack1 + 1;
          var kMenos = this.keyDstBack1 - 1;
          if (this.keySrc == kMas || this.keySrc == kMenos) { this.keyFlag1 = true }
          else (this.keyFlag1 = null)


          if (backId_src1.id == undefined) { this.constBackOrigin = true; }
          else if (backId_src1.id != backId.id) { this.constBackOrigin = false; }
          else if (backId_dst1.id == undefined) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (this.flagDstBack1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst2.id == undefined) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
          else if (this.flagDstBack2 == true) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst3.id == undefined) { this.stopNumErr = 6; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst3.id != id_src1.id) { this.stopNumErr = 6; this.constBackOrigin = null; this.constBackStop = false; }

          else if (this.flagSrcBack == true) {
            if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
            else if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == null) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
            else (this.constBackOrigin = null, this.constBackStop = null)
          }
          else if (this.flagSrcBack == false) {
            if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
            else if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == null) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
            else (this.constBackOrigin = null, this.constBackStop = null)
          }
          else (this.constBackOrigin = null, this.constBackStop = null)
        }
        //Viaje de regreso con cuatro paradas
        if (this.trips2.length == 4) {
          backId_dst1 = this.trips2[0].id_dst;
          backId_dst2 = this.trips2[1].id_dst;
          backId_dst3 = this.trips2[2].id_dst;
          backId_dst4 = this.trips2[3].id_dst;

          for (const keyD1 in getSrcs) {
            const position1 = getSrcs[keyD1].id
            if (position1 == backId_dst1.id) { this.keyDstBack1 = toInteger(keyD1) }
            if (position1 == backId_dst2.id) { this.keyDstBack2 = toInteger(keyD1) }
          }
          getDsts1lenngth = getSrcs.length - 1;
          if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
          else (this.flagDstBack1 = null)
          getDsts2lenngth = getSrcs.length - 1;
          if (getDsts2lenngth == this.keyDstBack2 || this.keyDstBack2 == 0) { this.flagDstBack2 = true }
          else (this.flagDstBack2 = null)
          getDsts3lenngth = getSrcs.length - 1;
          if (getDsts3lenngth == this.keyDstBack3 || this.keyDstBack3 == 0) { this.flagDstBack3 = true }
          else (this.flagDstBack3 = null)

          var kMas = this.keyDstBack1 + 1;
          var kMenos = this.keyDstBack1 - 1;
          if (this.keySrc == kMas || this.keySrc == kMenos) { this.keyFlag1 = true }
          else (this.keyFlag1 = null)


          if (backId_src1.id == undefined) { this.constBackOrigin = true; }
          else if (backId_src1.id != backId.id) { this.constBackOrigin = false; }
          else if (backId_dst1.id == undefined) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (this.flagDstBack1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst2.id == undefined) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
          else if (this.flagDstBack2 == true) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst3.id == undefined) { this.stopNumErr = 6; this.constBackOrigin = null; this.constBackStop = true; }
          else if (backId_dst4.id != id_src1.id) { this.stopNumErr = 8; this.constBackOrigin = null; this.constBackStop = false; }

          else if (this.flagSrcBack == true) {
            if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
            else if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == null) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
            else (this.constBackOrigin = null, this.constBackStop = null)
          }
          else if (this.flagSrcBack == false) {
            if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == true) { this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
            else if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == null) { this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
            else (this.constBackOrigin = null, this.constBackStop = null)
          }
          else (this.constBackOrigin = null, this.constBackStop = null)
        }
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
        this.trips[index + 1].id_src = this.trips[index].id_dst;
      }
    }


    this.preflight();

  }
  public onCreateTrip(round: boolean) {
    let index;
    let tr: Trip = new Trip(0, 0, new Date());

    this.constStop = true
    if ((this.radio) && (this.trips2[0].id_src == 0 || this.trips2[0].id_src == undefined)) { this.constBackOrigin = true }
    if ((this.radio) && (this.trips2[0].id_src != 0)) { this.constBackStop = true; this.stopNumErr = 4 }
    if ((this.radio) && (this.trips2[0].id_src == 0 || this.trips2[0].id_src == undefined)) { this.constBackOrigin = true }
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
    this.a1('origen'); this.a1('destino1');
    this.a1('pasajeros'); this.a1('inicio');
    this.a1('fin'); this.a1('clase'); this.a1('o4');
    this.a1('datepicker1'); this.a1('datepicker2');
    this.a1('datepicker3'); this.a1('datepicker4');
    this.a1('datepicker5'); this.a1('datepicker6');
    this.a1('datepicker7'); this.a1('datepicker8');
    this.a1('destino2'); this.a1('destino3');
    this.a1('destino4'); this.a1('destino5');
    this.a1('destino6'); this.a1('destino7'); this.a1('destino8');
    //this.dateChange();
    // if(this.session.query.src == null){this.last_failure_motive = "Elige un origen";this.a1('origen','orange');return false;}
    // if(this.session.query.dst == null){this.last_failure_motive = "Elige un destino";this.a1('destino','orange');return false;}
    if (this.session.route.pick_class && this.session.query.class == null) { this.flagDisabled = true; this.last_failure_motive = "Elige una clase."; this.a1('clase', 'orange'); this.step1 = this.translate.instant('Step1-P66'); return true; }
    if (this.trips[0].id_src == null || this.trips[0].id_src == 0) { this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.a1('origen', 'orange'); this.step1 = this.translate.instant('Step1-P67'); return true; }
    if (this.trips.length > 1 && this.flagOrigin) { this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P71'); this.a1('origen', 'orange'); return true; }
    if (this.trips[0].id_dst == null || this.trips[0].id_dst == 0) { this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.a1('destino1', 'orange'); this.step1 = this.translate.instant('Step1-P68'); return true; }
    var now_dt: Date = new Date();
    if (this.trips[0].start.getTime() < now_dt.getTime()) { this.flagDisabled = true; this.last_failure_motive = "Elige inicio válido"; this.a1('fecha1', 'orange'); this.step1 = this.translate.instant('Step1-P69'); return true; }

    if (this.trips.length >= 1 && this.constStop) { this.a1('destino' + this.stopNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.step1 = this.translate.instant('Step1-P68'); return true; }
    if (this.trips.length > 1 && this.constDate) { this.a1('datepicker' + this.dateNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige una fecha"; this.step1 = this.translate.instant('Step1-P70'); return true; }

    if ((this.radio) && (this.trips2[0].id_src == null || this.trips2[0].id_src == 0)) { this.a1('o4', 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P67'); return true; }
    if ((this.radio) && (this.trips2.length >= 1 && this.constBackOrigin == true)) { this.a1('o4', 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P67'); return true; }
    if ((this.radio) && (this.trips2.length >= 1 && this.constBackOrigin == false)) { this.a1('o4', 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P71'); return true; }
    if ((this.radio) && (this.trips2.length >= 1 && this.constBackStop == true)) { this.a1('destino' + this.stopNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.step1 = this.translate.instant('Step1-P68'); return true; }
    if ((this.radio) && (this.trips2.length >= 1 && this.constBackStop == false)) { this.a1('destino' + this.stopNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.step1 = this.translate.instant('Step1-P75'); return true; }
    if ((this.radio) && (this.trips2.length >= 1 && this.constBackDate)) { this.a1('datepicker' + this.dateNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige una fecha"; this.step1 = this.translate.instant('Step1-P70'); return true; }

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