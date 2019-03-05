import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BillFiscal } from './../../model/billFiscal';
import { BillService } from './../../billSession.service';

declare var $: any;
@NgModule({
  imports: [HttpClient]
})
@Component({
  selector: 'app-billFiscal',
  templateUrl: './billFiscal.component.html',
  styleUrls: ['./billFiscal.component.css']
})
export class BillFiscalComponent implements OnInit {
  public Prueba = {

    datos: [
      { name: 'Polanco 1a Secc.' }, { name: 'Polanco 2a Secc.' },
      { name: 'Polanco 3a Secc.' }, { name: 'Polanco 4a Secc.' },
      { name: 'Polanco 5a Secc.' }, { name: 'San Joaquín' },
      { name: 'Tacuba' }, { name: 'Tacubaya' }
    ]
  }
  public Pago= [
      { tipo: 'Pago en efectivo' },
      { tipo: 'Tarjeta' },
  ]
  public loadingPlanning = null;
  public requestBill;
  public fiscalBill;
  public fiscBill;
  public total;
  public cfdi;
  public rfc;
  public displayModal = null;
  public displayError = null;
  public displayConfirm = null;
  public ready = true;
  public fisReq;


  constructor(private _router: Router, private serviceBill: BillService,
    private translate: TranslateService) { }


  ngOnInit() {
    var Paso1Session = sessionStorage.getItem('billRequest');
    var Paso1SessionInfo = sessionStorage.getItem('billRequestInfo');
    var Paso2FiscalInfo = sessionStorage.getItem('billFiscalInfo');
    if (Paso1SessionInfo == null) {
      this._router.navigate(['/Facturacion']);
    }
    this.serviceBill.getFiscalCfdiBill().subscribe(
      (data: any) => {
        this.cfdi = data.data;
      }
    );
    this.fiscalBill = new BillFiscal("", "", "", "", "", "", "", "", "", "MIGUEL HIDALGO", "CDMX", "","", "");
    this.requestBill = JSON.parse(Paso1SessionInfo);
    this.fiscBill = JSON.parse(Paso1Session);
    this.total = this.fiscBill.monto_neto + this.fiscBill.impuestos;
    if (Paso2FiscalInfo != null) {
      this.fiscalBill = JSON.parse(Paso2FiscalInfo);
      sessionStorage.removeItem('billFiscalInfo');
    }
    sessionStorage.removeItem('billRequest');
    sessionStorage.removeItem('billRequestInfo')
  }

  onSubmit() {
    this.displayModal = true;
  }
  onSubmitModelReview() {
    this.displayModal = null;
    this.displayError = true;
    this.displayConfirm = null;
  }
  focusOutFunction(rfc) {
    let rfcMayus = rfc.toUpperCase()
    this.loadingPlanning = true;
    this.serviceBill.getFiscalRfcBill(rfcMayus).subscribe(
      (data: any) => {
        this.loadingPlanning = null;

        if (data.success) {
          this.rfc = data;
          this.fiscalBill = new BillFiscal(
            this.rfc.data.rfc,
            this.rfc.data.razon_social,
            this.rfc.data.forma_pago,
            this.rfc.data.uso_cfdi,
            this.rfc.data.calle,
            this.rfc.data.no_ext,
            this.rfc.data.no_int,
            this.rfc.data.cp,
            this.rfc.data.colonia,
            this.rfc.data.municipio = 'MIGUEL HIDALGO',
            this.rfc.data.pais = 'CDMX',
            this.rfc.data.correo_electronico,
            this.rfc.data.confirm_correo_electronico,
            this.rfc.data.telefono);
        } else (this.fiscalBill = new BillFiscal(rfc, "", "", "", "", "", "", "","", "MIGUEL HIDALGO", "CDMX", "", "", ""))
      }
    );
  }

  static email_regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static nameRazon: RegExp = /^[a-zA-ZÀ-ÿ0-9.,-\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9.,-\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9.,-\u00f1\u00d1]{2,60}$/;
  static calle: RegExp = /^[A-Za-z0-9\s]{2,60}$/;
  static rfc: RegExp = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/;
  static num: RegExp =  /^[A-Za-z0-9\s]{1,6}$/;
  static cp: RegExp = /^[0-9]{5}$/;
  static cellphone_regex: RegExp = /^[0-9]{8,16}$/;

  readyToGoNext(): boolean {
    
    $('.form-control').removeClass('orange');

    if (this.fiscalBill.rfc == undefined || this.fiscalBill.rfc == "") { $('#rfc').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P17'); this.ready = true; return false }
    else if (!BillFiscalComponent.rfc.test(this.fiscalBill.rfc)) { $('#rfc').addClass('orange');this.fisReq = this.translate.instant('BillFiscal-P26'); this.ready = true; return false; }
    
    else if (this.fiscalBill.razon_social == undefined || this.fiscalBill.razon_social == "") { $('#razon_social').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P18'); this.ready = true; return false }
    else if (!BillFiscalComponent.nameRazon.test(this.fiscalBill.razon_social)) { $('#razon_social').addClass('orange');this.fisReq = this.translate.instant('BillFiscal-P27'); this.ready = true; return false; }

    else if (this.fiscalBill.forma_pago == undefined || this.fiscalBill.forma_pago == "") { $('#formaDePago').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P19'); this.ready = true; return false }   
    else if (this.fiscalBill.uso_cfdi == undefined || this.fiscalBill.uso_cfdi == "") { $('#usoCFDI').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P20'); this.ready = true; return false }
    
    else if (this.fiscalBill.calle == undefined || this.fiscalBill.calle == "") { $('#calle').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P21'); this.ready = true; return false }
    else if (!BillFiscalComponent.calle.test(this.fiscalBill.calle)) { $('#calle').addClass('orange');this.fisReq = this.translate.instant('BillFiscal-P28'); this.ready = true; return false; }

    else if (this.fiscalBill.no_ext == undefined || this.fiscalBill.no_ext == "") { $('#no_ext').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P22'); this.ready = true; return false }
    else if (!BillFiscalComponent.num.test(this.fiscalBill.no_ext)) { $('#no_ext').addClass('orange');this.fisReq = this.translate.instant('BillFiscal-P30'); this.ready = true; return false; }

    else if (this.fiscalBill.no_int != "" && this.fiscalBill.no_int != undefined && this.fiscalBill.no_int != null && !BillFiscalComponent.num.test(this.fiscalBill.no_int)){ $('#no_int').addClass('orange');this.fisReq = this.translate.instant('BillFiscal-P29'); this.ready = true; return false; }

    else if (this.fiscalBill.cp == undefined || this.fiscalBill.cp == "") { $('#cp').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P23'); this.ready = true; return false }
    else if (!BillFiscalComponent.cp.test(this.fiscalBill.cp)) { $('#cp').addClass('orange');this.fisReq = this.translate.instant('BillFiscal-P31'); this.ready = true; return false; }

    else if (this.fiscalBill.colonia == undefined || this.fiscalBill.colonia == "") { $('#colonia').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P24'); this.ready = true; return false }
  
    else if (this.fiscalBill.correo_electronico == undefined || this.fiscalBill.correo_electronico == "") { $('#correo').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P25'); this.ready = true; return false }
    else if (!BillFiscalComponent.email_regex.test(this.fiscalBill.correo_electronico)) { $('#correo').addClass('orange');this.fisReq = this.translate.instant('BillFiscal-P32'); this.ready = true; return false; }

    else if (this.fiscalBill.confirmacion_correo_electronico == undefined || this.fiscalBill.confirmacion_correo_electronico == "") { $('#correoC').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P34'); this.ready = true; return false }
    else if (this.fiscalBill.confirmacion_correo_electronico != this.fiscalBill.correo_electronico) { $('#correoC').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P35'); this.ready = true; return false }

    else if (this.fiscalBill.telefono != "" && this.fiscalBill.telefono != undefined && this.fiscalBill.telefono != null && !BillFiscalComponent.cellphone_regex.test(this.fiscalBill.telefono)){ $('#telefono').addClass('orange');this.fisReq = this.translate.instant('BillFiscal-P33'); this.ready = true; return false; }


    else { this.ready = null; return true }
  }


  goBack() {
    sessionStorage.setItem('billRequest', JSON.stringify(this.fiscBill));
    sessionStorage.setItem('billRequestInfo', JSON.stringify(this.requestBill));
    sessionStorage.setItem('billFiscalInfo', JSON.stringify(this.fiscalBill));
    this._router.navigate(['/Facturacion-confirmacion']);
  }
  goBackModelReview() {
    this.displayModal = null;
    $(".modal-backdrop").attr("class", "");
    $(".modal-open").attr("style", "");
    $(".modal-open").attr("class", "");
  }
  finish() {
    $(".modal-backdrop").attr("class", "");
    $(".modal-open").attr("style", "");
    $(".modal-open").attr("class", "");
    this._router.navigate(['/Facturacion']);

  }
  goFisacal(){
    this.displayError = null;
    $(".modal-backdrop").attr("class", "");
    $(".modal-open").attr("style", "");
    $(".modal-open").attr("class", "");
    this._router.navigate(['/Facturacion-DatosFiscales']);

  }

}