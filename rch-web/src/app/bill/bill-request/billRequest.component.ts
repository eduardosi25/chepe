import { Component, OnInit, NgModule, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'selenium-webdriver';
import { request } from 'http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BillRequest } from './../../model/billRequest';
import { BillService } from './../../billSession.service';
import { NgForm } from '@angular/forms';
import { EEXIST } from 'constants';
declare var $: any;

@NgModule({
  imports: [HttpClient]
})
@Component({
  selector: 'app-billRequest',
  templateUrl: './billRequest.component.html',
  styleUrls: ['./billRequest.component.css']
})
export class BillRequestComponent implements OnInit {
  public requestBill: BillRequest;
  public folio;
  public billReq;
  public buttonFlag = true;
  public date; month; year;
  constructor(private _router: Router,
    private billService: BillService,
    private translate: TranslateService, ) {
      // _router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd) {
      //     this.ngOnInit();
          
      //   }
      // })
     }

  ngOnInit() {
    
    sessionStorage.clear();
    this.requestBill = new BillRequest("", "");
    this.folio = "";

    let rthis = this
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
    $("#datepicker").datepicker({
      language: 'es', format: "dd/mm/yyyy", autoclose: true,
    }).on('changeDate', (e) => {
      rthis.date = e.dates[0].getDate();
      rthis.month = e.dates[0].getMonth() + 1;
      rthis.year = e.dates[0].getFullYear();

      rthis.datePrepare();
    }).keydown(false);


  }

  datePrepare() {
    let d = this.date.toString();
    let m = this.month.toString();
    if (d.length == 1) {
      this.date = '0' + this.date;
    }
    if (m.length == 1) {
      this.month = '0' + this.month;
    }
    var dates = this.date + '/' + this.month + '/' + this.year;
    this.requestBill.fecha = dates;
  }

  readyToGoNext(): boolean {
    if (this.requestBill.clave == undefined || this.requestBill.clave == "") { $('#claveReq').addClass('orange'); this.billReq = this.translate.instant('BillRequest-P08'); this.buttonFlag = true; return false }
    else if (this.requestBill.fecha == undefined || this.requestBill.fecha == "") { $('#datepicker').addClass('orange'); this.billReq = this.translate.instant('BillRequest-P09'); this.buttonFlag = true; return false }
    else if (this.buttonFlag == false) { this.billReq = 'Reserva no encontrado'; this.buttonFlag = true; return false }
    else { this.buttonFlag = null; return true }
  }

  onSubmit() {
    this.billService.getReaquestBill(this.requestBill).subscribe(
      (data: any) => {
        if (data.success) {
          sessionStorage.setItem('billRequest', JSON.stringify(data.data[0]));
          sessionStorage.setItem('billRequestInfo', JSON.stringify(this.requestBill));
          this._router.navigate(['/Facturacion-confirmacion']);
        } else {
          this.buttonFlag = false
        }
      }, (e) => {
       
       console.log("Credenciales incorrectas");
      }
    );

  }
  onSubmitSearch() {
    this._router.navigate(['/Facturacion-Search']);
  }
}