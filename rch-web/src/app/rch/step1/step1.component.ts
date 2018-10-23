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
  public keyDst1: number;public keyDst2: number;public keyDst3: number;public keyDst4: number;
  public keySrcBack: number;
  public keyDstBack1: number;public keyDstBack2: number;public keyDstBack3: number;public keyDstBack4: number;
  public flagSrc: boolean = null;
  public flagDst1: boolean = null;public flagDst2: boolean = null;public flagDst3: boolean = null;public flagDst4: boolean = null;
  public flagSrcBack: boolean = null;
  public flagDstBack1: boolean = null;public flagDstBack2: boolean = null;public flagDstBack3: boolean = null;
  public dateStr1;public dateStr2;public dateStr3;public dateStr4;public dateStr5;public dateStr6;public dateStr7;public dateStr8;
  public dateGet;public dayGet1;public dayGet2;public dayGet3;public dayGet4;public dayGet5;public dayGet6;
  public fechaGet;public fechaGet1;public fechaGet2;public fechaGet3;public fechaGet4;public fechaGet5;public fechaGet6;public fechaGet7;
  public keyFlag1;public keyFlag2;public keyFlag3;public keyFlag4;public keyFlag5;public keyFlag6;
  // public stops:TrainStop[] = this.stops;
  ngOnInit() {
    this.dateChange();
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
    var self= this;
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
    $("#datepicker1").datepicker({language:'es', format: "dd/mm/yyyy",autoclose: true,defaultDate: "+1d",startDate: "+1d"
  }).on('changeDate',(e) => {self.fechaGet = e.date;self.dateChange();
    }).keydown(false);
    //DatePicker fecha 2
    $("#datepicker2").datepicker({language:'es', format: "dd/mm/yyyy",autoclose: true,defaultDate:"+1d",startDate:"+1d"
  }).on('changeDate',(e) => {self.fechaGet1 = e.date; self.dateChange();
    }).keydown(false);
      //DatePicker fecha 3
    $("#datepicker3").datepicker({language:'es', format: "dd/mm/yyyy",autoclose: true, defaultDate:"+1d",startDate:"+1d"
  }).on('changeDate',(e) => {self.fechaGet2 = e.date;self.dateChange();
    }).keydown(false);
      //Regreso DatePicker fecha 1
    $("#datepicker4").datepicker({language:'es', format: "dd/mm/yyyy",autoclose: true,defaultDate:"+1d",startDate: "+1d"
    }).on('changeDate',(e) => {self.fechaGet3 = e.date;self.dateChange();
      }).keydown(false);
        //Regreso DatePicker fecha 2
    $("#datepicker5").datepicker({language:'es', format: "dd/mm/yyyy",autoclose: true,defaultDate:"+1d",startDate:"+1d"
  }).on('changeDate',(e) => {self.fechaGet4 = e.date;self.dateChange();
    }).keydown(false);
      //Regreso DatePicker fecha 3
    $("#datepicker6").datepicker({language:'es', format: "dd/mm/yyyy",autoclose: true,defaultDate:"+1d",startDate:"+1d"
    }).on('changeDate',(e) => { self.fechaGet5 = e.date; self.dateChange();
      }).keydown(false);
      $("#datepicker7").datepicker({language:'es', format: "dd/mm/yyyy",
      autoclose: true,defaultDate:"+1d",startDate:"+1d"
    }).on('changeDate',(e) => { self.fechaGet6 = e.date; self.dateChange();
      }).keydown(false);
      $("#datepicker8").datepicker({format: "dd/mm/yyyy",
      autoclose: true,defaultDate:"+1d",startDate:"+1d"
    }).on('changeDate',(e) => { self.fechaGet7 = e.date; self.dateChange();
      }).keydown(false);
      
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
  
  public dateChange(){
    if(this.fechaGet == undefined){
      var d = new Date();var currDate = d.getDate() + 1;var currMonth = d.getMonth();var currYear = d.getFullYear();var aimp = currMonth + 1;this.fechaGet= new Date (currYear , currMonth , currDate  );this.dateStr1 = currDate + "/" + aimp  + "/" + currYear  ;this.trips[0].start = this.fechaGet;
      // Dos paradas indefinida la primera
        if(this.trips.length==2){var d1 = new Date();
          if(this.fechaGet1 == undefined){var currDate1 = d1.getDate() + 1; var currMonth1 = d1.getMonth();var currYear1 = d1.getFullYear(); var aimp1 = currMonth1 + 1; this.fechaGet1= new Date (currYear1 , currMonth1 , currDate1  );  this.dateStr2 = currDate1 + "/" + aimp1  + "/" + currYear1  ; this.dayGet1 = "+1d"; this.trips[1].start = this.fechaGet1 }
          if(this.fechaGet1 != undefined){var currDates3 = this.fechaGet1.getDate();var currMonths3 = this.fechaGet1.getMonth(); var currYears3 = this.fechaGet1.getFullYear();this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  ); this.trips[1].start =this.fechaGet1; var aimp6 = currMonths3 + 1;this.dateStr2 = currDates3 + "/" + aimp6  + "/" + currYears3  ;}
        }
        if(this.trips.length==3){var d1 = new Date();
          if(this.fechaGet1 == undefined){var currDate1 = d1.getDate() + 1;var currMonth1 = d1.getMonth();var currYear1 = d1.getFullYear();var aimp1 = currMonth1 + 1; this.fechaGet1= new Date (currYear1 , currMonth1 , currDate1  );this.dateStr2 = currDate1 + "/" + aimp1  + "/" + currYear1  ;this.dayGet1 = "+1d";this.trips[1].start = this.fechaGet1;}
          if(this.fechaGet1 != undefined){var currDates3 = this.fechaGet1.getDate();var currMonths3 = this.fechaGet1.getMonth();var currYears3 = this.fechaGet1.getFullYear();this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1;var aimp6 = currMonths3 + 1;this.dateStr2 = currDates3 + "/" + aimp6  + "/" + currYears3  ;}
          if(this.fechaGet2 == undefined){var currDate4 = d1.getDate() + 1;var currMonth4 = d1.getMonth(); var currYear4 = d1.getFullYear();var aimp8 = currMonth4 + 1;this.fechaGet2= new Date (currYear4 , currMonth4 , currDate4  );this.dateStr3 = currDate4 + "/" + aimp8  + "/" + currYear4  ;this.dayGet2 = "+1d";this.trips[2].start = this.fechaGet2;}
          if(this.fechaGet2 != undefined){var currDates4 = this.fechaGet2.getDate(); var currMonths4 = this.fechaGet2.getMonth(); var currYears4 = this.fechaGet2.getFullYear();this.fechaGet2= new Date (currYears4 , currMonths4 , currDates4  );this.trips[2].start = this.fechaGet2;var aimp7 = currMonths4 + 1;this.dateStr3 = currDates4 + "/" + aimp7  + "/" + currYears4  ;}
        }
      }
        else{ 
        this.trips[0].start = this.fechaGet;var currDates = this.fechaGet.getDate();var currMonths = this.fechaGet.getMonth();var currYears = this.fechaGet.getFullYear();var aimp4 = currMonths + 1;this.dateStr1 = currDates + "/" + aimp4  + "/" + currYears;
          // Fecha con dos paradas
          if(this.trips.length==2){var d3 = new Date();
            if(this.fechaGet1 == undefined){var dayGet = currDates - d3.getDate();this.dayGet1 = "+"+dayGet+"d";var currDates3 = this.fechaGet.getDate();var currMonths3 = this.fechaGet.getMonth();var currYears3 = this.fechaGet.getFullYear();var aimp5 = currMonths3 + 1; this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1;this.dateStr2 = currDates3 + "/" + aimp5  + "/" + currYears3;}
            if(this.fechaGet1 != undefined){
              if(this.fechaGet1.getDate() <= this.fechaGet.getDate()){var dayGet = currDates - d3.getDate();this.dayGet1 = "+"+dayGet+"d";var currDates3 = this.fechaGet.getDate();var currMonths3 = this.fechaGet.getMonth();var currYears3 = this.fechaGet.getFullYear();var aimp5 = currMonths3 + 1; this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1;this.dateStr2 = currDates3 + "/" + aimp5  + "/" + currYears3  ;} 
              if(this.fechaGet1.getDate() > this.fechaGet.getDate()){this.dayGet1 = "+"+dayGet+"d";var currDates3 = this.fechaGet1.getDate();var currMonths3 = this.fechaGet1.getMonth();var currYears3 = this.fechaGet1.getFullYear();this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1; var aimp6 = currMonths3 + 1; this.dateStr2 = currDates3 + "/" + aimp6  + "/" + currYears3  ;}
            }
          }
          // Fecha con tres paradas
          if(this.trips.length==3){var d4 = new Date();
              if(this.fechaGet1 == undefined){ var dayGet = currDates - d4.getDate();this.dayGet1 = "+"+dayGet+"d";var currDates3 = this.fechaGet.getDate();var currMonths3 = this.fechaGet.getMonth();var currYears3 = this.fechaGet.getFullYear();var aimp5 = currMonths3 + 1;this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1;this.dateStr2 = currDates3 + "/" + aimp5  + "/" + currYears3;}
              if(this.fechaGet1 != undefined){
                if(this.fechaGet1.getDate() <= this.fechaGet.getDate()){ var dayGet = currDates - d4.getDate(); this.dayGet1 = "+"+dayGet+"d";  var currDates3 = this.fechaGet.getDate();var currMonths3 = this.fechaGet.getMonth(); var currYears3 = this.fechaGet.getFullYear(); var aimp5 = currMonths3 + 1; this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1;this.dateStr2 = currDates3 + "/" + aimp5  + "/" + currYears3  ;} 
                if(this.fechaGet1.getDate() > this.fechaGet.getDate()){this.dayGet1 = "+"+dayGet+"d"; var currDates3 = this.fechaGet1.getDate(); var currMonths3 = this.fechaGet1.getMonth(); var currYears3 = this.fechaGet1.getFullYear();this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  ); this.trips[1].start = this.fechaGet1; var aimp6 = currMonths3 + 1;this.dateStr2 = currDates3 + "/" + aimp6  + "/" + currYears3  ;}
              }
              if(this.fechaGet2 == undefined){ var dayGet = currDates - d4.getDate(); this.dayGet1 = "+"+dayGet+"d";var currDates4 = this.fechaGet.getDate(); var currMonths4 = this.fechaGet.getMonth(); var currYears4 = this.fechaGet.getFullYear(); var aimp7 = currMonths4 + 1;this.fechaGet2= new Date (currYears4 , currMonths4 , currDates4  );this.trips[2].start = this.fechaGet2;this.dateStr3 = currDates4 + "/" + aimp7  + "/" + currYears4;}
              if(this.fechaGet2 != undefined){
                if(this.fechaGet2.getDate() <= this.fechaGet.getDate()){ var dayGet = currDates - d4.getDate();this.dayGet1 = "+"+dayGet+"d"; var currDates4 = this.fechaGet.getDate();var currMonths4 = this.fechaGet.getMonth();var currYears4 = this.fechaGet.getFullYear(); var aimp7 = currMonths4 + 1; this.fechaGet2= new Date (currYears4 , currMonths4 , currDates4  );this.trips[2].start = this.fechaGet2;this.dateStr3 = currDates4 + "/" + aimp7  + "/" + currYears4  ;} 
                if(this.fechaGet2.getDate() > this.fechaGet.getDate()){this.dayGet1 = "+"+dayGet+"d";var currDates4 = this.fechaGet2.getDate();var currMonths4 = this.fechaGet2.getMonth();var currYears4 = this.fechaGet2.getFullYear();this.fechaGet2= new Date (currYears4 , currMonths4 , currDates4  ); this.trips[2].start = this.fechaGet2;var aimp7 = currMonths4 + 1; this.dateStr3 = currDates4 + "/" + aimp7  + "/" + currYears4  ; }
              }
          }
          // Fecha con cuatro paradas
          if(this.trips.length==4){var d5 = new Date();
            if(this.fechaGet1 == undefined){var dayGet = currDates - d5.getDate();this.dayGet1 = "+"+dayGet+"d";var currDates3 = this.fechaGet.getDate();var currMonths3 = this.fechaGet.getMonth();var currYears3 = this.fechaGet.getFullYear();var aimp5 = currMonths3 + 1;this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1;this.dateStr2 = currDates3 + "/" + aimp5  + "/" + currYears3;}
           
            if(this.fechaGet1 != undefined){
              if(this.fechaGet1.getDate() <= this.fechaGet.getDate()){var dayGet = currDates - d5.getDate(); this.dayGet1 = "+"+dayGet+"d";  var currDates3 = this.fechaGet.getDate();var currMonths3 = this.fechaGet.getMonth();var currYears3 = this.fechaGet.getFullYear();var aimp5 = currMonths3 + 1;this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1;this.dateStr2 = currDates3 + "/" + aimp5  + "/" + currYears3  ;} 
             if(this.fechaGet1.getDate() > this.fechaGet.getDate()){this.dayGet1 = "+"+dayGet+"d"; var currDates3 = this.fechaGet1.getDate();var currMonths3 = this.fechaGet1.getMonth();var currYears3 = this.fechaGet1.getFullYear();this.fechaGet1= new Date (currYears3 , currMonths3 , currDates3  );this.trips[1].start = this.fechaGet1; var aimp6 = currMonths3 + 1;this.dateStr2 = currDates3 + "/" + aimp6  + "/" + currYears3  ;}
            }
            if(this.fechaGet2 == undefined){ var dayGet = currDates - d5.getDate(); this.dayGet1 = "+"+dayGet+"d";var currDates4 = this.fechaGet.getDate(); var currMonths4 = this.fechaGet.getMonth(); var currYears4 = this.fechaGet.getFullYear(); var aimp7 = currMonths4 + 1;this.fechaGet2= new Date (currYears4 , currMonths4 , currDates4  );this.trips[2].start = this.fechaGet2;this.dateStr3 = currDates4 + "/" + aimp7  + "/" + currYears4;}
            if(this.fechaGet2 != undefined){
              if(this.fechaGet2.getDate() <= this.fechaGet.getDate()){ var dayGet = currDates - d5.getDate();this.dayGet1 = "+"+dayGet+"d"; var currDates4 = this.fechaGet.getDate();var currMonths4 = this.fechaGet.getMonth();var currYears4 = this.fechaGet.getFullYear(); var aimp7 = currMonths4 + 1; this.fechaGet2= new Date (currYears4 , currMonths4 , currDates4  );this.trips[2].start = this.fechaGet2;this.dateStr3 = currDates4 + "/" + aimp7  + "/" + currYears4  ;} 
              if(this.fechaGet2.getDate() > this.fechaGet.getDate()){this.dayGet1 = "+"+dayGet+"d";var currDates4 = this.fechaGet2.getDate();var currMonths4 = this.fechaGet2.getMonth();var currYears4 = this.fechaGet2.getFullYear();this.fechaGet2= new Date (currYears4 , currMonths4 , currDates4  ); this.trips[2].start = this.fechaGet2;var aimp7 = currMonths4 + 1; this.dateStr3 = currDates4 + "/" + aimp7  + "/" + currYears4  ; }
            }
            if(this.fechaGet6 == undefined){ 
              var dayGet = currDates - d5.getDate(); 
              this.dayGet1 = "+"+dayGet+"d";
              var currDates5 = this.fechaGet.getDate(); 
              var currMonths5 = this.fechaGet.getMonth(); 
              var currYears5 = this.fechaGet.getFullYear(); 
              var aimp9 = currMonths5 + 1;
              this.fechaGet2= new Date (currYears5 , currMonths5 , currDates5  );
              this.trips[3].start = this.fechaGet2;
              this.dateStr7 = currDates5 + "/" + aimp9  + "/" + currYears5;}
            
            if(this.fechaGet6 != undefined){
              if(this.fechaGet6.getDate() <= this.fechaGet.getDate()){ 
                var dayGet = currDates - d5.getDate();
                this.dayGet1 = "+"+dayGet+"d"; 
                var currDates5 = this.fechaGet.getDate();
                var currMonths5 = this.fechaGet.getMonth();
                var currYears5 = this.fechaGet.getFullYear();
                var aimp9 = currMonths5 + 1; 
                this.fechaGet6= new Date (currYears5 , currMonths5 , currDates5  );
                this.trips[3].start = this.fechaGet6;
                this.dateStr7 = currDates5 + "/" + aimp9  + "/" + currYears5  ;} 
            
                if(this.fechaGet6.getDate() > this.fechaGet.getDate()){
                this.dayGet1 = "+"+dayGet+"d";
                var currDates5 = this.fechaGet6.getDate();
                var currMonths5 = this.fechaGet6.getMonth();
                var currYears5 = this.fechaGet6.getFullYear();
                this.fechaGet6= new Date (currYears5 , currMonths5 , currDates5  ); 
                this.trips[3].start = this.fechaGet6;
                var aimp9 = currMonths5 + 1; 
                this.dateStr7 = currDates5 + "/" + aimp9  + "/" + currYears5  ; }
                }
                
        }
        }
        //Viaje de regreso
    if (this.radio) {
      if(this.fechaGet3 == undefined){
        var ds = new Date();
        var backDates = ds.getDate() + 1;
        var backMonths = ds.getMonth();
        var backYears = ds.getFullYear();
        var aimps = backMonths + 1;
        this.fechaGet3= new Date (backYears , backMonths, backDates  );
        this.dateStr4 = backDates + "/" + aimps  + "/" + backYears  ;
        this.trips2[0].start = this.fechaGet3;

        // Dos paradas indefinida la primera
      if(this.trips2.length==2){var d1s = new Date();
        if(this.fechaGet4 == undefined){ var currDate1s = d1s.getDate() + 1;var currMonth1s = d1s.getMonth();  var currYear1s = d1s.getFullYear(); var aimp1s = currMonth1s + 1;  this.fechaGet4= new Date (currYear1s , currMonth1s , currDate1s  );this.dateStr5 = currDate1s + "/" + aimp1s  + "/" + currYear1s  ;this.dayGet4 = "+1d";  this.trips2[1].start = this.fechaGet4;}
        if(this.fechaGet4 != undefined){ var currDate2s = this.fechaGet4.getDate(); var currMonth2s = this.fechaGet4.getMonth(); var currYear2s = this.fechaGet4.getFullYear();this.fechaGet4= new Date (currYear2s , currMonth2s , currDate2s  );this.trips2[1].start =this.fechaGet4;var aimp2s = currMonth2s + 1;this.dateStr5 = currDate2s + "/" + aimp2s  + "/" + currYear2s  ;}
      }
      // tres paradas indefinida la primera
      if(this.trips2.length==3){var d1s = new Date();
          if(this.fechaGet4 == undefined){ var currDate1s = d1s.getDate() + 1;var currMonth1s = d1s.getMonth();var currYear1s = d1s.getFullYear();var aimp1s = currMonth1s + 1;this.fechaGet4= new Date (currYear1s , currMonth1s , currDate1s  );this.dateStr5 = currDate1s + "/" + aimp1s  + "/" + currYear1s  ;this.dayGet4 = "+1d";this.trips2[1].start =this.fechaGet4;}
          if(this.fechaGet4 != undefined){ var currDate2s = this.fechaGet4.getDate();var currMonth2s = this.fechaGet4.getMonth();var currYear2s = this.fechaGet4.getFullYear();this.fechaGet4= new Date (currYear2s , currMonth2s , currDate2s  ); this.trips2[1].start =this.fechaGet4;var aimp2s = currMonth2s + 1;  this.dateStr5 = currDate2s + "/" + aimp2s  + "/" + currYear2s  ; }
          if(this.fechaGet5 == undefined){ var currDate3s = d1s.getDate() + 1;var currMonth3s = d1s.getMonth(); var currYear3s = d1s.getFullYear();var aimp3s = currMonth3s + 1;this.fechaGet5= new Date (currYear3s , currMonth3s , currDate3s  ); this.dateStr6 = currDate3s + "/" + aimp3s  + "/" + currYear3s  ; this.dayGet5 = "+1d"; this.trips2[2].start = this.fechaGet5;}
          if(this.fechaGet5 != undefined){var currDates3s = this.fechaGet5.getDate();var currMonths3s = this.fechaGet5.getMonth();var currYears3s = this.fechaGet5.getFullYear();this.fechaGet5= new Date (currYears3s , currMonths3s , currDates3s  ); this.trips2[2].start = this.fechaGet5 ; var aimp4s = currMonths3s + 1;this.dateStr6 = currDates3s + "/" + aimp4s  + "/" + currYears3s  ;}
      }
          }
      else{   
      this.trips2[0].start = this.fechaGet3
      var currDates1s = this.fechaGet3.getDate();
      var currMonths1s = this.fechaGet3.getMonth();
      var currYears1s = this.fechaGet3.getFullYear();
      var aimp4s = currMonths1s + 1;
      this.dateStr4 = currDates1s + "/" + aimp4s  + "/" + currYears1s;
        // Fecha con dos paradas
        if(this.trips2.length==2){var d3 = new Date();
          if(this.fechaGet4 == undefined){ var dayGet = currDates - d3.getDate();this.dayGet1 = "+"+dayGet+"d"; var currDates3 = this.fechaGet3.getDate();var currMonths3 = this.fechaGet3.getMonth();var currYears3 = this.fechaGet3.getFullYear();var aimp5 = currMonths3 + 1; this.fechaGet4 = new Date (currYears3 , currMonths3 , currDates3  ); this.trips2[1].start = this.fechaGet4;this.dateStr5 = currDates3 + "/" + aimp5  + "/" + currYears3;}
          if(this.fechaGet4 != undefined){
            if(this.fechaGet4.getDate() <= this.fechaGet3.getDate()){var dayGet = currDates - d3.getDate(); this.dayGet1 = "+"+dayGet+"d";var currDates3 = this.fechaGet3.getDate(); var currMonths3 = this.fechaGet3.getMonth();var currYears3 = this.fechaGet3.getFullYear(); var aimp5 = currMonths3 + 1; this.fechaGet4= new Date (currYears3 , currMonths3 , currDates3  ); this.trips2[1].start = this.fechaGet4;this.dateStr5 = currDates3 + "/" + aimp5  + "/" + currYears3  ;} 
            if(this.fechaGet4.getDate() > this.fechaGet3.getDate()){var currDates3 = this.fechaGet4.getDate();var currMonths3 = this.fechaGet4.getMonth();var currYears3 = this.fechaGet4.getFullYear(); this.fechaGet4 = new Date (currYears3 , currMonths3 , currDates3  );this.trips2[1].start = this.fechaGet4;var aimp6 = currMonths3 + 1; this.dateStr5 = currDates3 + "/" + aimp6  + "/" + currYears3  ;}
          }
        }
        // Fecha con tres paradas
        if(this.trips2.length==3){var d3 = new Date();
          if(this.fechaGet4 == undefined){ var dayGet = currDates - d3.getDate();var currDates3 = this.fechaGet3.getDate();var currMonths3 = this.fechaGet3.getMonth();var currYears3 = this.fechaGet3.getFullYear();var aimp5 = currMonths3 + 1;this.fechaGet4= new Date (currYears3 , currMonths3 , currDates3  );this.trips2[1].start = this.fechaGet4;this.dateStr5 = currDates3 + "/" + aimp5  + "/" + currYears3;}
          if(this.fechaGet4 != undefined){
            if(this.fechaGet4.getDate() <= this.fechaGet3.getDate()){var dayGet = currDates - d3.getDate();var currDates3 = this.fechaGet3.getDate();var currMonths3 = this.fechaGet3.getMonth();var currYears3 = this.fechaGet3.getFullYear();var aimp5 = currMonths3 + 1;this.fechaGet4= new Date (currYears3 , currMonths3 , currDates3  );this.trips2[1].start = this.fechaGet4;this.dateStr5 = currDates3 + "/" + aimp5  + "/" + currYears3  ;} 
            if(this.fechaGet4.getDate() > this.fechaGet3.getDate()){var currDates3 = this.fechaGet4.getDate();var currMonths3 = this.fechaGet4.getMonth();var currYears3 = this.fechaGet4.getFullYear();this.fechaGet4= new Date (currYears3 , currMonths3 , currDates3  );this.trips2[1].start = this.fechaGet4;var aimp6 = currMonths3 + 1;this.dateStr5 = currDates3 + "/" + aimp6  + "/" + currYears3  ;}
          }
          if(this.fechaGet5 == undefined){var dayGet = currDates - d3.getDate();var currDates5 = this.fechaGet3.getDate();var currMonths5 = this.fechaGet3.getMonth();var currYears5 = this.fechaGet3.getFullYear();var aimp7 = currMonths5 + 1;this.fechaGet5= new Date (currYears5 , currMonths5 , currDates5  );this.trips2[2].start = this.fechaGet5;this.dateStr6 = currDates5 + "/" + aimp7  + "/" + currYears5;}
          if(this.fechaGet5 != undefined){
            if(this.fechaGet5.getDate() <= this.fechaGet3.getDate()){var dayGet = currDates - d3.getDate();var currDates5 = this.fechaGet3.getDate();var currMonths5 = this.fechaGet3.getMonth();var currYears5 = this.fechaGet3.getFullYear();var aimp7 = currMonths5 + 1;this.fechaGet5= new Date (currYears5 , currMonths5 , currDates5  );this.trips2[2].start = this.fechaGet5;this.dateStr6 = currDates5 + "/" + aimp7  + "/" + currYears5  ;} 
            if(this.fechaGet5.getDate() > this.fechaGet3.getDate()){;var currDates5 = this.fechaGet5.getDate();var currMonths5 = this.fechaGet5.getMonth();var currYears5 = this.fechaGet5.getFullYear();this.fechaGet5= new Date (currYears5 , currMonths5 , currDates5  );this.trips2[2].start = this.fechaGet5;var aimp7 = currMonths5 + 1;this.dateStr6 = currDates5 + "/" + aimp7  + "/" + currYears5  ;}
          }
        }
        if(this.trips2.length==4){var d3 = new Date();
          if(this.fechaGet4 == undefined){ var dayGet = currDates - d3.getDate();var currDates3 = this.fechaGet3.getDate();var currMonths3 = this.fechaGet3.getMonth();var currYears3 = this.fechaGet3.getFullYear();var aimp5 = currMonths3 + 1;this.fechaGet4= new Date (currYears3 , currMonths3 , currDates3  );this.trips2[1].start = this.fechaGet4;this.dateStr5 = currDates3 + "/" + aimp5  + "/" + currYears3;}
          if(this.fechaGet4 != undefined){
            if(this.fechaGet4.getDate() <= this.fechaGet3.getDate()){var dayGet = currDates - d3.getDate();var currDates3 = this.fechaGet3.getDate();var currMonths3 = this.fechaGet3.getMonth();var currYears3 = this.fechaGet3.getFullYear();var aimp5 = currMonths3 + 1;this.fechaGet4= new Date (currYears3 , currMonths3 , currDates3  );this.trips2[1].start = this.fechaGet4;this.dateStr5 = currDates3 + "/" + aimp5  + "/" + currYears3  ;} 
            if(this.fechaGet4.getDate() > this.fechaGet3.getDate()){var currDates3 = this.fechaGet4.getDate();var currMonths3 = this.fechaGet4.getMonth();var currYears3 = this.fechaGet4.getFullYear();this.fechaGet4= new Date (currYears3 , currMonths3 , currDates3  );this.trips2[1].start = this.fechaGet4;var aimp6 = currMonths3 + 1;this.dateStr5 = currDates3 + "/" + aimp6  + "/" + currYears3  ;}
          }
          if(this.fechaGet5 == undefined){var dayGet = currDates - d3.getDate();var currDates5 = this.fechaGet3.getDate();var currMonths5 = this.fechaGet3.getMonth();var currYears5 = this.fechaGet3.getFullYear();var aimp7 = currMonths5 + 1;this.fechaGet5= new Date (currYears5 , currMonths5 , currDates5  );this.trips2[2].start = this.fechaGet5;this.dateStr6 = currDates5 + "/" + aimp7  + "/" + currYears5;}
          if(this.fechaGet5 != undefined){
            if(this.fechaGet5.getDate() <= this.fechaGet3.getDate()){var dayGet = currDates - d3.getDate();var currDates5 = this.fechaGet3.getDate();var currMonths5 = this.fechaGet3.getMonth();var currYears5 = this.fechaGet3.getFullYear();var aimp7 = currMonths5 + 1;this.fechaGet5= new Date (currYears5 , currMonths5 , currDates5  );this.trips2[2].start = this.fechaGet5;this.dateStr6 = currDates5 + "/" + aimp7  + "/" + currYears5  ;} 
            if(this.fechaGet5.getDate() > this.fechaGet3.getDate()){;var currDates5 = this.fechaGet5.getDate();var currMonths5 = this.fechaGet5.getMonth();var currYears5 = this.fechaGet5.getFullYear();this.fechaGet5= new Date (currYears5 , currMonths5 , currDates5  );this.trips2[2].start = this.fechaGet5;var aimp7 = currMonths5 + 1;this.dateStr6 = currDates5 + "/" + aimp7  + "/" + currYears5  ;}
          }
          if(this.fechaGet7 == undefined){var dayGet = currDates - d3.getDate();var currDates7 = this.fechaGet3.getDate();var currMonths7 = this.fechaGet3.getMonth();var currYears7 = this.fechaGet3.getFullYear();var aimp10 = currMonths7 + 1;this.fechaGet7= new Date (currYears7 , currMonths7 , currDates7  );this.trips2[2].start = this.fechaGet7;this.dateStr8 = currDates7 + "/" + aimp10  + "/" + currYears7;}
          if(this.fechaGet7 != undefined){
            if(this.fechaGet7.getDate() <= this.fechaGet3.getDate()){var dayGet = currDates - d3.getDate();var currDates7 = this.fechaGet3.getDate();var currMonths7 = this.fechaGet3.getMonth();var currYears7 = this.fechaGet3.getFullYear();var aimp10 = currMonths7 + 1;this.fechaGet7= new Date (currYears7 , currMonths7 , currDates7  );this.trips2[2].start = this.fechaGet7;this.dateStr8 = currDates7 + "/" + aimp10  + "/" + currYears7  ;} 
            if(this.fechaGet7.getDate() > this.fechaGet3.getDate()){var currDates7 = this.fechaGet7.getDate();var currMonths7 = this.fechaGet7.getMonth();var currYears7 = this.fechaGet7.getFullYear();this.fechaGet7= new Date (currYears7 , currMonths7 , currDates7  );this.trips2[2].start = this.fechaGet7; var aimp10 = currMonths7 + 1;this.dateStr8 = currDates7 + "/" + aimp10  + "/" + currYears7  ;}
          }
       
      
    }

      }
    }this.onDateChange();this.createInstance();
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
    if (this.trips.length == 4) {
      if (this.trips[1].start.getTime() <= this.trips[0].start.getTime()) { this.dateNumErr = 2; this.constDate = true }
      else if (this.trips[2].start.getTime() <= this.trips[1].start.getTime()) { this.dateNumErr = 3; this.constDate = true }
      else if (this.trips[3].start.getTime() <= this.trips[2].start.getTime()) { this.dateNumErr = 7; this.constDate = true }
     
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
      }this.onChangeStop(true , this.trips2[0])
    }
    
    
  }
  public onChangeStop(round: boolean, tr: Trip) {

    let index;
    var id_dst1 = null;var id_dst2 = null;var id_dst3 = null;var id_dst4 = null;
    var id_src1 = null;
    var backId_dst1 = null;var backId_dst2 = null;var backId_dst3 = null;var backId_dst4 = null;
    var backId_src1 = null;
    var backId = null;
    var getSrcs = null; getSrcs = this.getSrcs(0);  id_src1 = this.trips[0].id_src;
    var getSrcslenngth = null; var getSrcs1lenngth = null; 
     
    var getDsts1lenngth = null;  var getDsts2lenngth = null;  var getDsts3lenngth = null;
    
    for (const key in getSrcs) {
      const position = getSrcs[key].id
      if (position == id_src1.id) { this.keySrc = toInteger(key) }
    }
    getSrcslenngth = this.getSrcs(0).length - 1;
    if (getSrcslenngth == this.keySrc) { this.flagSrc = true }
    else if (this.keySrc == 0) { this.flagSrc = false }
    else (this.flagSrc = null)
   
    //express
    if(this.route.id == 2){   
    // Viaje de ida 
  if (this.trips.length == 1){
    id_dst1 = this.trips[0].id_dst;
    
    if (id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
    else (this.constStop = null)
  }
// Viaje ida con dos paradas
  
    if (this.trips.length == 2){
      id_dst1 = this.trips[0].id_dst;
      id_dst2 = this.trips[1].id_dst;

      for (const keyD1 in getSrcs){
        const position1 = getSrcs[keyD1].id
        if(position1 == id_dst1.id){ this.keyDst1 = toInteger(keyD1)}
      }
      getDsts1lenngth = this.getDsts(0).length - 1;
      if (getDsts1lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
      else (this.flagDst1 = null)
  
      if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
      else if(id_dst2.id == undefined || id_dst2.id == id_src1.id){this.constStop = true; this.stopNumErr = 2}
      else if(this.flagDst1 == true){this.flagDst1 = null;this.constStop = true; this.stopNumErr = 1}
      else if(this.flagSrc == null && id_dst1.id <= id_src1.id && id_dst1.id <= id_dst2.id){this.constStop = true; this.stopNumErr = 1}
      else if(this.flagSrc == null && id_dst1.id >= id_src1.id && id_dst1.id >= id_dst2.id){this.constStop = true; this.stopNumErr = 1}
      else if (this.flagSrc == false && id_dst2.id <= id_dst1.id){this.constStop = true ; this.stopNumErr= 2}
      else if (this.flagSrc == true && id_dst2.id >= id_dst1.id){this.constStop = true ; this.stopNumErr= 2}
      else (this.constStop = null)

    }

// Viaje ida con tres paradas

    if(this.trips.length == 3){
      id_dst1 = this.trips[0].id_dst;
      id_dst2 = this.trips[1].id_dst;
      id_dst3 = this.trips[2].id_dst;

      for (const key in getSrcs) {
        const position = getSrcs[key].id
        if(position == id_dst1.id){ this.keyDst1 = toInteger(key)}
        if(position == id_dst2.id){ this.keyDst2 = toInteger(key)}
        if(position == id_dst3.id){ this.keyDst3 = toInteger(key)}
      }
      getDsts1lenngth = this.getSrcs(0).length - 1;
       if (getDsts1lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
      else (this.flagDst1 = null)
      if (getDsts1lenngth == this.keyDst2 || this.keyDst2 == 0) { this.flagDst2 = true }
      else (this.flagDst2 = null)
      if (getDsts1lenngth == this.keyDst3 || this.keyDst3 == 0) { this.flagDst3 = null }
      else (this.flagDst3 = true)
    
      var kMas = this.keyDst1 + 1;
      var kMenos = this.keyDst1 -1;
      if (this.keySrc == kMas || this.keySrc == kMenos){this.keyFlag1 = true}
      else (this.keyFlag1 = null)

      if (this.flagSrc == null){this.flagOrigin = true;}
      else if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.flagOrigin = null;this.constStop = true; this.stopNumErr = 1}
      else if(id_dst2.id == undefined || id_dst2.id == id_src1.id){this.flagOrigin = null;this.constStop = true; this.stopNumErr = 2}
      else if(id_dst3.id == undefined || id_dst3.id == id_src1.id){this.flagOrigin = null;this.constStop = true; this.stopNumErr = 3}
      else if(this.flagDst1 == true){this.flagOrigin = null;this.flagDst1 = null;this.constStop = true; this.stopNumErr = 1}
      else if(this.flagDst2 == true){this.flagOrigin = null;this.flagDst2 = null;this.constStop = true; this.stopNumErr = 2}
      else if(this.flagDst3 == true){this.flagOrigin = null;this.flagDst3 = null;this.constStop = true; this.stopNumErr = 3}
      else if (this.flagSrc == true) { 
        if (id_dst2.id >= id_dst1.id && this.keyFlag1 == null) {this.flagOrigin = null; this.constStop = true;  this.stopNumErr = 1  } 
        else if (id_dst2.id >= id_dst1.id && this.keyFlag1 == true) {this.flagOrigin = null; this.constStop = true;  this.stopNumErr = 2  } 
        else if (id_dst3.id >= id_dst2.id){this.flagOrigin = null; this.constStop = true;  this.stopNumErr = 2  } 
        else (this.flagOrigin = null,  this.constStop = null ) }
      else if (this.flagSrc == false) { 
        if (id_dst2.id <= id_dst1.id && this.keyFlag1 == null) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 1  } 
        else if (id_dst2.id <= id_dst1.id && this.keyFlag1 == true) { this.flagOrigin = null; this.constStop = true; this.stopNumErr = 2  } 
        else if( id_dst3.id <= id_dst2.id){ this.flagOrigin = null; this.constStop = true; this.stopNumErr = 2 }
        else (this.constStop = null,this.flagOrigin = null) }
        else (this.constStop = null, this.flagOrigin = null)
      

    }

///////////Viaje de regreso//////////////
if (this.radio) {
  

  for (const key in this.trips) 
  {var pos = key} backId = this.trips[pos].id_dst
  backId_src1 = this.trips2[0].id_src;
  

  for (const key in getSrcs) {
    const position = getSrcs[key].id
    if (position == backId_src1.id) { this.keySrcBack = toInteger(key) }
  }
   getSrcslenngth = this.getSrcs(0).length - 1;
  if (getSrcslenngth == this.keySrcBack) { this.flagSrcBack = true }
  else if (this.keySrcBack == 0) { this.flagSrcBack = false }
  else (this.flagSrcBack = null)
//Viaje de regreso con una parada
if (this.trips2.length == 1){
  backId_dst1 = this.trips2[0].id_dst;
  if (backId_src1 == undefined){this.constBackOrigin = true;}
  else if (backId_src1.id != backId.id){this.constBackOrigin = true;}
  else if (backId_dst1.id == undefined){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst1.id != id_src1.id){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else { this.constBackStop = null; this.constBackOrigin = null; }
}
//Viaje de regreso con dos paradas
if (this.trips2.length == 2){
  backId_dst1 = this.trips2[0].id_dst;
  backId_dst2 = this.trips2[1].id_dst;

  for (const keyD1 in getSrcs){
    const position1 = getSrcs[keyD1].id
    if(position1 == backId_dst1.id){ this.keyDstBack1 = toInteger(keyD1)}
  }

   getDsts1lenngth = this.getDsts(0).length - 1;
  if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
  else (this.flagDstBack1 = null)

  if (backId_src1.id == undefined){this.constBackOrigin = true;}
  else if (backId_src1.id != backId.id){this.constBackOrigin = true;}
  else if (backId_dst1.id == undefined){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (this.flagDstBack1 == true){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst2.id == undefined){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst2.id != id_src1.id){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else { this.constBackStop = null; this.constBackOrigin = null; }

}
//Viaje de regreso con tres paradas
if (this.trips2.length == 3){
  backId_dst1 = this.trips2[0].id_dst;
  backId_dst2 = this.trips2[1].id_dst;
  backId_dst3 = this.trips2[2].id_dst;

  for (const keyD1 in getSrcs){
    const position1 = getSrcs[keyD1].id
    if(position1 == backId_dst1.id){ this.keyDstBack1 = toInteger(keyD1)}
  }
  getDsts1lenngth = this.getDsts(0).length - 1;
  if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
  else (this.flagDstBack1 = null)

  for (const keyD2 in getSrcs){
    const position2 = getSrcs[keyD2].id
    if(position2 == backId_dst2.id){ this.keyDstBack2 = toInteger(keyD2)}
  }
 getDsts2lenngth = this.getDsts(1).length - 1;
  if (getDsts2lenngth == this.keyDstBack2 || this.keyDstBack2 == 0) { this.flagDstBack2 = true }
  else (this.flagDstBack2 = null)

  var kMas = this.keyDstBack1 + 1;
  var kMenos = this.keyDstBack1 -1;
  if (this.keySrc == kMas || this.keySrc == kMenos){this.keyFlag1 = true}
  else (this.keyFlag1 = null)


  if (backId_src1.id == undefined){this.constBackOrigin = true;}
  else if (backId_src1.id != backId.id){this.constBackOrigin = true;}
  else if (backId_dst1.id == undefined){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (this.flagDstBack1 == true){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst2.id == undefined){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else if (this.flagDstBack2 == true){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst3.id == undefined){this.stopNumErr = 6; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst3.id != id_src1.id){this.stopNumErr = 6;this.constBackOrigin = null; this.constBackStop = true;  }
 
  else if (this.flagSrcBack == true) { 
    if      (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == true) {this.stopNumErr = 4;this.constBackOrigin = null; this.constBackStop = true;   } 
    else if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == null) {this.stopNumErr = 5;this.constBackOrigin = null; this.constBackStop = true;   } 
    else     (this.constBackOrigin = null, this.constBackStop = null)
  }
    else if (this.flagSrcBack == false) { 
    if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == true) {this.stopNumErr = 4;this.constBackOrigin = null; this.constBackStop = true;} 
     else if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == null) {this.stopNumErr = 5;this.constBackOrigin = null; this.constBackStop = true; } 
     else (this.constBackOrigin = null, this.constBackStop = null ) }
  else (this.constBackOrigin = null, this.constBackStop = null)
    }

  }

}

// Regional
if(this.route.id == 1){  
// Viaje de ida 
  if (this.trips.length == 1){
    id_dst1 = this.trips[0].id_dst;
    
    if (id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
    else (this.constStop = null)
  }
// Viaje de ida con una parada
  if (this.trips.length == 2){
    id_dst1 = this.trips[0].id_dst;
    id_dst2 = this.trips[1].id_dst;

  for (const key in getSrcs){
    const position2 = getSrcs[key].id
    if(position2 == id_src1.id){ this.keySrc = toInteger(key)}
    if(position2 == id_dst1.id){ this.keyDst1 = toInteger(key)}
  }
  getDsts1lenngth = this.getDsts(1).length - 2;
  if (getDsts1lenngth == this.keySrc) { this.flagSrc = true }
  else if (this.keySrc == 1){this.flagSrc = false}
  else (this.flagSrc = null)

  getDsts2lenngth = this.getDsts(1).length - 1;
  if (getDsts2lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
  else (this.flagDst1 = null)



  for (const keyD2 in getSrcs){
    const position2 = getSrcs[keyD2].id
    if(position2 == id_dst2.id){ this.keyDst2 = toInteger(keyD2)}
  }
  var kMas = this.keyDst2 + 1;
  var kMenos = this.keyDst2 -1;
  if (this.keySrc == kMas || this.keySrc == kMenos){this.keyFlag1 = true}
  else (this.keyFlag1 = null)

  if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
  else if(this.flagDst1 == true){this.constStop = true; this.stopNumErr = 1}
  else if(this.flagSrc == false && id_dst1.id <= id_src1.id){this.constStop = true; this.stopNumErr = 1}
  else if(this.flagSrc == true && id_dst1.id >= id_src1.id){this.constStop = true; this.stopNumErr = 1}
  else if(id_dst2.id == undefined || id_dst2.id == id_src1.id){this.constStop = true; this.stopNumErr = 2}
  
  else if (this.keyFlag1 == true && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id >= id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
  else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id > id_dst2.id ){this.constStop = true; this.stopNumErr = 1}
  else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id == id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
  
  else if (id_src1.id < id_dst1.id && id_src1.id >= id_dst2.id){this.constStop = true; this.stopNumErr = 2}
  

  else if (id_src1.id > id_dst1.id && id_src1.id <= id_dst2.id){this.constStop = true; this.stopNumErr = 2}
  else if (this.keyFlag1 == true && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id <= id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
  else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id < id_dst2.id ){this.constStop = true; this.stopNumErr = 1}
  else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id == id_dst2.id ){this.constStop = true; this.stopNumErr = 2}

  else (this.constStop = null)
  }
  // Viaje de ida con dos paradas
if(this.trips.length == 3){
 id_dst1 = this.trips[0].id_dst;
 id_dst2 = this.trips[1].id_dst;
 id_dst3 = this.trips[2].id_dst;
 

  for (const key in getSrcs){
    const position2 = getSrcs[key].id
    if(position2 == id_src1.id){ this.keySrc = toInteger(key)}
    if(position2 == id_dst1.id){ this.keyDst1 = toInteger(key)}
    if(position2 == id_dst2.id){ this.keyDst2 = toInteger(key)}
    if(position2 == id_dst3.id){ this.keyDst3 = toInteger(key)}
  }
  getSrcslenngth = this.getDsts(1).length - 2;
  getSrcs1lenngth = this.getDsts(1).length - 3;
  if (getSrcslenngth == this.keySrc || getSrcs1lenngth == this.keySrc) { this.flagSrc = true }
  else if (this.keySrc == 1 || this.keySrc == 2){this.flagSrc = false}
  else (this.flagSrc = null)

  getDsts1lenngth = this.getDsts(1).length - 1;
  if (getDsts1lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
  else (this.flagDst1 = null)

  getDsts2lenngth = this.getDsts(1).length - 1;
  if (getDsts2lenngth == this.keyDst2 || this.keyDst2 == 0) { this.flagDst2 = true }
  else (this.flagDst2 = null)

  var kMas = this.keyDst2 + 1;
  var kMenos = this.keyDst2 -1;
  if (this.keySrc == kMas || this.keySrc == kMenos){this.keyFlag1 = true}
  else (this.keyFlag1 = null)
  var kMas1 = this.keyDst3 + 1;
  var kMenos1 = this.keyDst3 -1;
  if (this.keySrc == kMas1 || this.keySrc == kMenos1){this.keyFlag2 = true}
  else (this.keyFlag2 = null)

  if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
  else if(this.flagDst1 == true){this.constStop = true; this.stopNumErr = 1}
  else if(this.flagSrc == false && id_dst1.id <= id_src1.id){this.constStop = true; this.stopNumErr = 1}
  else if(this.flagSrc == true && id_dst1.id >= id_src1.id){this.constStop = true; this.stopNumErr = 1}
  else if(id_dst2.id == undefined || id_dst2.id == id_src1.id){this.constStop = true; this.stopNumErr = 2}
  else if(this.flagSrc == false && id_dst2.id <= id_src1.id){this.constStop = true; this.stopNumErr = 2}
  else if(this.flagSrc == true && id_dst2.id >= id_src1.id){this.constStop = true; this.stopNumErr = 2}
  else if(id_dst3.id == undefined || id_dst3.id == id_src1.id){this.constStop = true; this.stopNumErr = 3}
 
  else if (this.keyFlag1 == true && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id >= id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
  else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id > id_dst2.id ){this.constStop = true; this.stopNumErr = 1}
  else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id == id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
  else if (id_src1.id < id_dst1.id && id_src1.id >= id_dst2.id){this.constStop = true; this.stopNumErr = 2}
  

  else if (id_src1.id > id_dst1.id && id_src1.id <= id_dst2.id){this.constStop = true; this.stopNumErr = 2}
  else if (this.keyFlag1 == true && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id <= id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
  else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id < id_dst2.id ){this.constStop = true; this.stopNumErr = 1}
  else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id == id_dst2.id ){this.constStop = true; this.stopNumErr = 2}

  else if (this.keyFlag2 == true && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id >= id_dst3.id ){this.constStop = true; this.stopNumErr = 3}
  else if (this.keyFlag2 == null && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id > id_dst3.id ){this.constStop = true; this.stopNumErr = 2}
  else if (this.keyFlag2 == null && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id == id_dst3.id ){this.constStop = true; this.stopNumErr = 3}
  else if (id_src1.id < id_dst2.id && id_src1.id >= id_dst3.id){this.constStop = true; this.stopNumErr = 3}
  

  else if (id_src1.id > id_dst2.id && id_src1.id <= id_dst3.id){this.constStop = true; this.stopNumErr = 3}
  else if (this.keyFlag2 == true && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id <= id_dst3.id ){this.constStop = true; this.stopNumErr = 3}
  else if (this.keyFlag2 == null && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id < id_dst3.id ){this.constStop = true; this.stopNumErr = 2}
  else if (this.keyFlag2 == null && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id == id_dst3.id ){this.constStop = true; this.stopNumErr = 3}

  else (this.constStop = null)
}

 // Viaje de ida con tres paradas
 if(this.trips.length == 4){
  id_dst1 = this.trips[0].id_dst;
  id_dst2 = this.trips[1].id_dst;
  id_dst3 = this.trips[2].id_dst;
  id_dst4 = this.trips[3].id_dst;
  
 
   for (const key in getSrcs){
     const position2 = getSrcs[key].id
     if(position2 == id_src1.id){ this.keySrc = toInteger(key)}
     if(position2 == id_dst1.id){ this.keyDst1 = toInteger(key)}
     if(position2 == id_dst2.id){ this.keyDst2 = toInteger(key)}
     if(position2 == id_dst3.id){ this.keyDst3 = toInteger(key)}
     if(position2 == id_dst4.id){ this.keyDst4 = toInteger(key)}

   }
   getSrcslenngth = this.getDsts(1).length - 2;
   getSrcs1lenngth = this.getDsts(1).length - 3;
   if (getSrcslenngth == this.keySrc || getSrcs1lenngth == this.keySrc) { this.flagSrc = true }
   else if (this.keySrc == 1 || this.keySrc == 2){this.flagSrc = false}
   else (this.flagSrc = null)
 
   getDsts1lenngth = this.getDsts(1).length - 1;
   if (getDsts1lenngth == this.keyDst1 || this.keyDst1 == 0) { this.flagDst1 = true }
   else (this.flagDst1 = null)
 
   getDsts2lenngth = this.getDsts(1).length - 1;
   if (getDsts2lenngth == this.keyDst2 || this.keyDst2 == 0) { this.flagDst2 = true }
   else (this.flagDst2 = null)

   getDsts3lenngth = this.getDsts(1).length - 1;
   if (getDsts3lenngth == this.keyDst3 || this.keyDst3 == 0) { this.flagDst3 = true }
   else (this.flagDst3 = null)
 
   var kMas = this.keyDst2 + 1;
   var kMenos = this.keyDst2 -1;
   if (this.keySrc == kMas || this.keySrc == kMenos){this.keyFlag1 = true}
   else (this.keyFlag1 = null)
   var kMas1 = this.keyDst3 + 1;
   var kMenos1 = this.keyDst3 -1;
   if (this.keySrc == kMas1 || this.keySrc == kMenos1){this.keyFlag2 = true}
   else (this.keyFlag2 = null)
   var kMas2 = this.keyDst4 + 1;
   var kMenos2 = this.keyDst4 -1;
   if (this.keySrc == kMas2 || this.keySrc == kMenos2){this.keyFlag3 = true}
   else (this.keyFlag3 = null)
 

   if(id_dst1.id == undefined || id_dst1.id == id_src1.id){this.constStop = true; this.stopNumErr = 1}
   else if(this.flagDst1 == true){this.constStop = true; this.stopNumErr = 1}
   else if(this.flagSrc == false && id_dst1.id <= id_src1.id){this.constStop = true; this.stopNumErr = 1}
   else if(this.flagSrc == true && id_dst1.id >= id_src1.id){this.constStop = true; this.stopNumErr = 1}
   else if(id_dst2.id == undefined || id_dst2.id == id_src1.id){this.constStop = true; this.stopNumErr = 2}
   else if(this.flagSrc == false && id_dst2.id <= id_src1.id){this.constStop = true; this.stopNumErr = 2}
   else if(this.flagSrc == true && id_dst2.id >= id_src1.id){this.constStop = true; this.stopNumErr = 2}
   else if(id_dst3.id == undefined || id_dst3.id == id_src1.id){this.constStop = true; this.stopNumErr = 3}
   else if(this.flagSrc == false && id_dst3.id <= id_src1.id){this.constStop = true; this.stopNumErr = 3}
   else if(this.flagSrc == true && id_dst3.id >= id_src1.id){this.constStop = true; this.stopNumErr = 3}
   else if(id_dst4.id == undefined || id_dst4.id == id_src1.id){this.constStop = true; this.stopNumErr = 7}
  
   else if (this.keyFlag1 == true && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id >= id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
   else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id > id_dst2.id ){this.constStop = true; this.stopNumErr = 1}
   else if (this.keyFlag1 == null && id_src1.id < id_dst1.id && id_src1.id <= id_dst2.id && id_dst1.id == id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
   else if (id_src1.id < id_dst1.id && id_src1.id >= id_dst2.id){this.constStop = true; this.stopNumErr = 2}
   else if (id_src1.id > id_dst1.id && id_src1.id <= id_dst2.id){this.constStop = true; this.stopNumErr = 2}
   else if (this.keyFlag1 == true && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id <= id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
   else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id < id_dst2.id ){this.constStop = true; this.stopNumErr = 1}
   else if (this.keyFlag1 == null && id_src1.id > id_dst1.id && id_src1.id >= id_dst2.id && id_dst1.id == id_dst2.id ){this.constStop = true; this.stopNumErr = 2}
 
   else if (this.keyFlag2 == true && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id >= id_dst3.id ){this.constStop = true; this.stopNumErr = 3}
   else if (this.keyFlag2 == null && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id > id_dst3.id ){this.constStop = true; this.stopNumErr = 2}
   else if (this.keyFlag2 == null && id_src1.id < id_dst2.id && id_src1.id <= id_dst3.id && id_dst2.id == id_dst3.id ){this.constStop = true; this.stopNumErr = 3}
   else if (id_src1.id < id_dst2.id && id_src1.id >= id_dst3.id){this.constStop = true; this.stopNumErr = 3}
   else if (id_src1.id > id_dst2.id && id_src1.id <= id_dst3.id){this.constStop = true; this.stopNumErr = 3}
   else if (this.keyFlag2 == true && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id <= id_dst3.id ){this.constStop = true; this.stopNumErr = 3}
   else if (this.keyFlag2 == null && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id < id_dst3.id ){this.constStop = true; this.stopNumErr = 2}
   else if (this.keyFlag2 == null && id_src1.id > id_dst2.id && id_src1.id >= id_dst3.id && id_dst2.id == id_dst3.id ){this.constStop = true; this.stopNumErr = 3}
 
   else if (this.keyFlag3 == true && id_src1.id < id_dst3.id && id_src1.id <= id_dst4.id && id_dst3.id >= id_dst4.id ){this.constStop = true; this.stopNumErr = 7}
   else if (this.keyFlag3 == null && id_src1.id < id_dst3.id && id_src1.id <= id_dst4.id && id_dst3.id > id_dst4.id ){this.constStop = true; this.stopNumErr = 3}
   else if (this.keyFlag3 == null && id_src1.id < id_dst3.id && id_src1.id <= id_dst4.id && id_dst3.id == id_dst4.id ){this.constStop = true; this.stopNumErr = 7}
   else if (id_src1.id < id_dst3.id && id_src1.id >= id_dst4.id){this.constStop = true; this.stopNumErr = 7}
   else if (id_src1.id > id_dst3.id && id_src1.id <= id_dst4.id){this.constStop = true; this.stopNumErr = 7}
   else if (this.keyFlag3 == true && id_src1.id > id_dst3.id && id_src1.id >= id_dst4.id && id_dst3.id <= id_dst4.id ){this.constStop = true; this.stopNumErr = 7}
   else if (this.keyFlag3 == null && id_src1.id > id_dst3.id && id_src1.id >= id_dst4.id && id_dst3.id < id_dst4.id ){this.constStop = true; this.stopNumErr = 3}
   else if (this.keyFlag3 == null && id_src1.id > id_dst3.id && id_src1.id >= id_dst4.id && id_dst3.id == id_dst4.id ){this.constStop = true; this.stopNumErr = 7}
 

   else (this.constStop = null)
 }
///////////Viaje de regreso//////////////
if (this.radio) {
  

  for (const key in this.trips) 
  {var pos = key} backId = this.trips[pos].id_dst
  backId_src1 = this.trips2[0].id_src;
  

  for (const key in getSrcs) {
    const position = getSrcs[key].id
    if (position == backId_src1.id) { this.keySrcBack = toInteger(key) }
  }
   getSrcslenngth = this.getSrcs(0).length - 1;
  if (getSrcslenngth == this.keySrcBack) { this.flagSrcBack = true }
  else if (this.keySrcBack == 0) { this.flagSrcBack = false }
  else (this.flagSrcBack = null)
//Viaje de regreso con una parada
if (this.trips2.length == 1){
  backId_dst1 = this.trips2[0].id_dst;
  if (backId_src1 == undefined){this.constBackOrigin = true;}
  else if (backId_src1.id != backId.id){this.constBackOrigin = true;}
  else if (backId_dst1.id == undefined){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst1.id != id_src1.id){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else { this.constBackStop = null; this.constBackOrigin = null; }
}
//Viaje de regreso con dos paradas
if (this.trips2.length == 2){
  backId_dst1 = this.trips2[0].id_dst;
  backId_dst2 = this.trips2[1].id_dst;

  for (const keyD1 in getSrcs){
    const position1 = getSrcs[keyD1].id
    if(position1 == backId_dst1.id){ this.keyDstBack1 = toInteger(keyD1)}
  }

   getDsts1lenngth = this.getDsts(0).length - 1;
  if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
  else (this.flagDstBack1 = null)

  if (backId_src1.id == undefined){this.constBackOrigin = true;}
  else if (backId_src1.id != backId.id){this.constBackOrigin = true;}
  else if (backId_dst1.id == undefined){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (this.flagDstBack1 == true){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst2.id == undefined){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst2.id != id_src1.id){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else { this.constBackStop = null; this.constBackOrigin = null; }

}
//Viaje de regreso con tres paradas
if (this.trips2.length == 3){
  backId_dst1 = this.trips2[0].id_dst;
  backId_dst2 = this.trips2[1].id_dst;
  backId_dst3 = this.trips2[2].id_dst;

  for (const keyD1 in getSrcs){
    const position1 = getSrcs[keyD1].id
    if(position1 == backId_dst1.id){ this.keyDstBack1 = toInteger(keyD1)}
  }
  getDsts1lenngth = this.getDsts(0).length - 1;
  if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
  else (this.flagDstBack1 = null)

  for (const keyD2 in getSrcs){
    const position2 = getSrcs[keyD2].id
    if(position2 == backId_dst2.id){ this.keyDstBack2 = toInteger(keyD2)}
  }
 getDsts2lenngth = this.getDsts(1).length - 1;
  if (getDsts2lenngth == this.keyDstBack2 || this.keyDstBack2 == 0) { this.flagDstBack2 = true }
  else (this.flagDstBack2 = null)

  var kMas = this.keyDstBack1 + 1;
  var kMenos = this.keyDstBack1 -1;
  if (this.keySrc == kMas || this.keySrc == kMenos){this.keyFlag1 = true}
  else (this.keyFlag1 = null)


  if (backId_src1.id == undefined){this.constBackOrigin = true;}
  else if (backId_src1.id != backId.id){this.constBackOrigin = true;}
  else if (backId_dst1.id == undefined){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (this.flagDstBack1 == true){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst2.id == undefined){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else if (this.flagDstBack2 == true){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst3.id == undefined){this.stopNumErr = 6; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst3.id != id_src1.id){this.stopNumErr = 6;this.constBackOrigin = null; this.constBackStop = true;  }
 
  else if (this.flagSrcBack == true) { 
    if      (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == true) {this.stopNumErr = 4;this.constBackOrigin = null; this.constBackStop = true;   } 
    else if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == null) {this.stopNumErr = 5;this.constBackOrigin = null; this.constBackStop = true;   } 
    else     (this.constBackOrigin = null, this.constBackStop = null)
  }
    else if (this.flagSrcBack == false) { 
    if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == true) {this.stopNumErr = 4;this.constBackOrigin = null; this.constBackStop = true;} 
     else if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == null) {this.stopNumErr = 5;this.constBackOrigin = null; this.constBackStop = true; } 
     else (this.constBackOrigin = null, this.constBackStop = null ) }
  else (this.constBackOrigin = null, this.constBackStop = null)
    }
//Viaje de regreso con cuatro paradas
if (this.trips2.length == 4){
  backId_dst1 = this.trips2[0].id_dst;
  backId_dst2 = this.trips2[1].id_dst;
  backId_dst3 = this.trips2[2].id_dst;
  backId_dst4 = this.trips2[3].id_dst;

  for (const keyD1 in getSrcs){
    const position1 = getSrcs[keyD1].id
    if(position1 == backId_dst1.id){ this.keyDstBack1 = toInteger(keyD1)}
    if(position1 == backId_dst2.id){ this.keyDstBack2 = toInteger(keyD1)}
  }
  getDsts1lenngth = this.getDsts(0).length - 1;
  if (getDsts1lenngth == this.keyDstBack1 || this.keyDstBack1 == 0) { this.flagDstBack1 = true }
  else (this.flagDstBack1 = null)
 getDsts2lenngth = this.getDsts(1).length - 1;
  if (getDsts2lenngth == this.keyDstBack2 || this.keyDstBack2 == 0) { this.flagDstBack2 = true }
  else (this.flagDstBack2 = null)
  getDsts3lenngth = this.getDsts(1).length - 1;
  if (getDsts3lenngth == this.keyDstBack3 || this.keyDstBack3 == 0) { this.flagDstBack3 = true }
  else (this.flagDstBack3 = null)
  
  var kMas = this.keyDstBack1 + 1;
  var kMenos = this.keyDstBack1 -1;
  if (this.keySrc == kMas || this.keySrc == kMenos){this.keyFlag1 = true}
  else (this.keyFlag1 = null)
 

  if (backId_src1.id == undefined){this.constBackOrigin = true;}
  else if (backId_src1.id != backId.id){this.constBackOrigin = true;}
  else if (backId_dst1.id == undefined){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (this.flagDstBack1 == true){this.stopNumErr = 4; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst2.id == undefined){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else if (this.flagDstBack2 == true){this.stopNumErr = 5; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst3.id == undefined){this.stopNumErr = 6; this.constBackOrigin = null; this.constBackStop = true; }
  else if (backId_dst4.id != id_src1.id){this.stopNumErr = 8;this.constBackOrigin = null; this.constBackStop = true;  }
 
  else if (this.flagSrcBack == true) { 
    if      (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == true) {this.stopNumErr = 4;this.constBackOrigin = null; this.constBackStop = true;   } 
    else if (backId_dst2.id >= backId_dst1.id && this.keyFlag1 == null) {this.stopNumErr = 5;this.constBackOrigin = null; this.constBackStop = true;   } 
    else     (this.constBackOrigin = null, this.constBackStop = null)
  }
    else if (this.flagSrcBack == false) { 
    if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == true) {this.stopNumErr = 4;this.constBackOrigin = null; this.constBackStop = true;} 
     else if (backId_dst2.id <= backId_dst1.id && this.keyFlag1 == null) {this.stopNumErr = 5;this.constBackOrigin = null; this.constBackStop = true; } 
     else (this.constBackOrigin = null, this.constBackStop = null ) }
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
        this.trips[index + 1].id_src = tr.id_dst;
      }
    }
    this.preflight();

  }
  public onCreateTrip(round: boolean) {
    let index;
    let tr: Trip = new Trip(0, 0, new Date());
   
     this.constStop = true
    if ((this.radio)&&( this.trips2[0].id_src == 0 || this.trips2[0].id_src == undefined)) { this.constBackOrigin = true }
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
    this.dateChange();
    this.createInstance();
    this.numStops++;
    this.onChangeStop(true, this.trips2[1]);
    this.onChangeStop(true, this.trips[0]);
    
   
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
    this.dateChange();
    this.onChangeStop(true, this.trips2[1]);
    this.onChangeStop(true, this.trips[0]);
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
    this.a1('datepicker7');this.a1('datepicker8');
    this.a1('destino2'); this.a1('destino3');
    this.a1('destino4'); this.a1('destino5');
    this.a1('destino6');this.a1('destino7');this.a1('destino8');
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
    
    if ((this.radio)&&(this.trips2[0].id_src == null || this.trips2[0].id_src == 0)){ this.a1('o4', 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P71'); return true; }
    if ((this.radio)&&(this.trips2.length >= 1 && this.constBackOrigin)) { this.a1('o4', 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un origen"; this.step1 = this.translate.instant('Step1-P71'); return true; }
    if ((this.radio)&&(this.trips2.length >= 1 && this.constBackStop)) { this.a1('destino' + this.stopNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige un destino"; this.step1 = this.translate.instant('Step1-P68'); return true; }
    if ((this.radio)&&(this.trips2.length >= 1 && this.constBackDate)) { this.a1('datepicker' + this.dateNumErr, 'orange'); this.flagDisabled = true; this.last_failure_motive = "Elige una fecha"; this.step1 = this.translate.instant('Step1-P70'); return true; }
   
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
    this.dateChange();
    this.createInstance();
    
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
    this.dateChange();
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