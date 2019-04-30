import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BillFiscal } from './../../model/billFiscal';
import { BillService } from './../../billSession.service';
/** Inicializa variable para poder usar jquery en componente */
declare var $: any;
@NgModule({
  imports: [HttpClient]
})
/**Componente de la pantala donde se llena el formulario de datos fiscales*/
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
  public Pago = [
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
  public dat;
  public displayModal = null;
  public displayError = null;
  public displayConfirm = null;
  public ready = true;
  public fisReq;
  public confirmacion_correo_electronico;
  public conceptos = [{}]
  public msgError;


  constructor(private _router: Router, private serviceBill: BillService,
    private translate: TranslateService) { }

  /**Valida que existan datos en el sessionStorage y obtiene todos los datos que se encuentran en el, si no tien te manda a la pantalla principal.
   * Tambien inicializa el modelo de BillFiscal
  */
  ngOnInit() {
    var Paso1Session = sessionStorage.getItem('billRequest');
    var Paso1SessionInfo = sessionStorage.getItem('billRequestInfo');
    var Paso2FiscalInfo = sessionStorage.getItem('billFiscalInfo');
    var paso1Date = sessionStorage.getItem('date')
    if (Paso1SessionInfo == null) {
      this._router.navigate(['/Facturacion']);
    }
    this.serviceBill.getFiscalCfdiBill().subscribe(
      (data: any) => {
        this.cfdi = data.data;
      }
    );
    this.dat = paso1Date
    this.requestBill = JSON.parse(Paso1SessionInfo);
    this.fiscBill = JSON.parse(Paso1Session);
    this.total = this.fiscBill.monto_neto + this.fiscBill.impuestos;

    if (Paso2FiscalInfo != null) {
      this.fiscalBill = JSON.parse(Paso2FiscalInfo);
      sessionStorage.removeItem('billFiscalInfo');
    }
    sessionStorage.removeItem('billRequest');
    sessionStorage.removeItem('billRequestInfo')
    this.fiscalBill = new BillFiscal("", "", "", "", "", "", "", "", "", "", "", "", "", "", [{ clave: this.requestBill.clave, monto_neto: this.fiscBill.monto_neto, impuestos: this.fiscBill.impuestos, fecha_venta: this.dat }]);
    this.conceptos = [{ clave: this.requestBill.clave, monto_neto: this.fiscBill.monto_neto, impuestos: this.fiscBill.impuestos, fecha_venta: this.requestBill.fecha }]
    console.log(this.conceptos)
  }
  /**Boton para mostrar el modal de confirmación de datos */
  onSubmit() {
    this.displayModal = true;

  }
  /**Boton del modelo de verificación de datos donde se enviara al servicio los datos para generar la factura */
  onSubmitModelReview() {
    console.log(this.fiscalBill)
    this.serviceBill.setBill(this.fiscalBill).subscribe(
      (data: any) => {
        if (data.success) {
          console.log(data)
          this.displayModal = null;
          this.displayError = null;
          this.displayConfirm = true;
        } else {
          this.displayModal = null;
          this.displayError = true;
          this.displayConfirm = null;
          this.msgError = data.status.message
        }
      }, (e) => {
        console.log(e)
        this.displayModal = null;
        this.displayError = true;
        this.displayConfirm = null;
        this.msgError = "Lo sentimos por el momento no se pudo completar el proceso intente mas tarde"
      }
    )
  }
  /**Función que escucha los cambios en el rfc y verifica en el servicio si ya existe en la bd y si es asi trae los datos */
  focusOutFunction(rfc) {
    let rfcMayus = rfc.toUpperCase()
    this.loadingPlanning = true;
    this.serviceBill.getFiscalRfcBill(rfcMayus).subscribe(
      (data: any) => {
        this.loadingPlanning = null;

        if (data.success) {
          this.rfc = data;
          this.fiscalBill = new BillFiscal(
            this.rfc.data.razon_social,
            this.rfc.data.rfc,
            this.rfc.data.forma_pago,
            this.rfc.data.uso_cfdi,
            this.rfc.data.calle,
            this.rfc.data.no_ext,
            this.rfc.data.no_int,
            this.rfc.data.cp,
            this.rfc.data.colonia,
            this.rfc.data.municipio,
            this.rfc.data.estado,
            this.rfc.data.pais = 'MEXICO',
            this.rfc.data.correo_electronico,
            // this.rfc.data.confirm_correo_electronico,
            this.rfc.data.telefono,
            [{ clave: this.requestBill.clave, monto_neto: this.fiscBill.monto_neto, impuestos: this.fiscBill.impuestos, fecha_venta: this.dat }]
          )
        // } else (this.fiscalBill = new BillFiscal("", rfc, "", "", "", "", "", "", "", "", "", "MEXICO", "", "", [{ clave: this.requestBill.clave, monto_neto: this.fiscBill.monto_neto, impuestos: this.fiscBill.impuestos, fecha_venta: this.dat }]))
      }
    });
  }

  static email_regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static nameRazon: RegExp = /^[0-9]*[a-zA-Z][a-zA-Z0-9À-ÿ.,-\u00f1\s]{1,60}$/;
  static calle: RegExp = /^[A-Za-z0-9\s]{2,60}$/;
  static rfc: RegExp = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/;
  static num: RegExp = /^[a-zA-Z]*[0-9][a-zA-Z0-9]{0,5}$/;
  static cp: RegExp = /^[0-9]{5}$/;
  static cellphone_regex: RegExp = /^[0-9]{8,16}$/;
  static CME: RegExp = /^[A-Za-z\s]{2,60}$/;
  /**Función que constantemente esta validando que los campos obligatorios esten llenos y que cumplan con el formato requerido */
  readyToGoNext(): boolean {
    $('.form-control').removeClass('orange');
    if (this.fiscalBill.rfc == undefined || this.fiscalBill.rfc == "") { $('#rfc').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P17'); this.ready = true; return false }
    else if (!BillFiscalComponent.rfc.test(this.fiscalBill.rfc)) { $('#rfc').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P26'); this.ready = true; return false; }
    else if (this.fiscalBill.razon_social == undefined || this.fiscalBill.razon_social == "") { $('#razon_social').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P18'); this.ready = true; return false }
    else if (!BillFiscalComponent.nameRazon.test(this.fiscalBill.razon_social)) { $('#razon_social').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P27'); this.ready = true; return false; }
    else if (this.fiscalBill.forma_pago == undefined || this.fiscalBill.forma_pago == "") { $('#formaDePago').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P19'); this.ready = true; return false }
    else if (this.fiscalBill.uso_cfdi == undefined || this.fiscalBill.uso_cfdi == "") { $('#usoCFDI').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P20'); this.ready = true; return false }
    else if (this.fiscalBill.calle == undefined || this.fiscalBill.calle == "") { $('#calle').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P21'); this.ready = true; return false }
    else if (!BillFiscalComponent.calle.test(this.fiscalBill.calle)) { $('#calle').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P28'); this.ready = true; return false; }
    else if (this.fiscalBill.no_ext == undefined || this.fiscalBill.no_ext == "") { $('#no_ext').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P22'); this.ready = true; return false }
    else if (!BillFiscalComponent.num.test(this.fiscalBill.no_ext)) { $('#no_ext').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P30'); this.ready = true; return false; }
    else if (this.fiscalBill.no_int != "" && this.fiscalBill.no_int != undefined && this.fiscalBill.no_int != null && !BillFiscalComponent.num.test(this.fiscalBill.no_int)) { $('#no_int').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P29'); this.ready = true; return false; }
    else if (this.fiscalBill.cp == undefined || this.fiscalBill.cp == "") { $('#cp').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P23'); this.ready = true; return false }
    else if (!BillFiscalComponent.cp.test(this.fiscalBill.cp)) { $('#cp').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P31'); this.ready = true; return false; }
    else if (this.fiscalBill.colonia == undefined || this.fiscalBill.colonia == "") { $('#colonia').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P24'); this.ready = true; return false }
    else if (!BillFiscalComponent.CME.test(this.fiscalBill.colonia)) { $('#colonia').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P41'); this.ready = true; return false }
    else if (this.fiscalBill.municipio == undefined || this.fiscalBill.municipio == "") { $('#municipio').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P37'); this.ready = true; return false }
    else if (!BillFiscalComponent.CME.test(this.fiscalBill.municipio)) { $('#municipio').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P39'); this.ready = true; return false }
    else if (this.fiscalBill.estado == undefined || this.fiscalBill.estado == "") { $('#estado').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P38'); this.ready = true; return false }
    else if (!BillFiscalComponent.CME.test(this.fiscalBill.estado)) { $('#estado').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P40'); this.ready = true; return false }
    else if (this.fiscalBill.correo_electronico == undefined || this.fiscalBill.correo_electronico == "") { $('#correo').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P25'); this.ready = true; return false }
    else if (!BillFiscalComponent.email_regex.test(this.fiscalBill.correo_electronico)) { $('#correo').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P32'); this.ready = true; return false; }
    else if (this.confirmacion_correo_electronico == undefined || this.confirmacion_correo_electronico == "") { $('#correoC').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P34'); this.ready = true; return false }
    else if (this.confirmacion_correo_electronico != this.fiscalBill.correo_electronico) { $('#correoC').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P35'); this.ready = true; return false }
    else if (this.fiscalBill.telefono != "" && this.fiscalBill.telefono != undefined && this.fiscalBill.telefono != null && !BillFiscalComponent.cellphone_regex.test(this.fiscalBill.telefono)) { $('#telefono').addClass('orange'); this.fisReq = this.translate.instant('BillFiscal-P33'); this.ready = true; return false; }
    else { this.ready = null; return true }
  }
  /**Función que te regresa al paso anterior */
  goBack() {
    sessionStorage.setItem('billRequest', JSON.stringify(this.fiscBill));
    sessionStorage.setItem('billRequestInfo', JSON.stringify(this.requestBill));
    sessionStorage.setItem('billFiscalInfo', JSON.stringify(this.fiscalBill));
    this._router.navigate(['/Facturacion-confirmacion']);
  }
  /**Función del boton de regresar del model de confirmación de datos que te regresa a llenar tus datos fiscales */
  goBackModelReview() {
    this.displayModal = null;
    $(".modal-backdrop").attr("class", "");
    $(".modal-open").attr("style", "");
    $(".modal-open").attr("class", "");
  }
  /**Función del boton que se muestra en el model de finalización del proceso de manera exitosa y te manda al inicio */
  finish() {
    $(".modal-backdrop").attr("class", "");
    $(".modal-open").attr("style", "");
    $(".modal-open").attr("class", "");
    this._router.navigate(['/Facturacion']);
  }
  /**Función del boton que se muestra en el model de finalización del proceso de manera errada y te manda a la pantalla de Facturacion-DatosFiscales */
  goFisacal() {
    this.displayError = null;
    $(".modal-backdrop").attr("class", "");
    $(".modal-open").attr("style", "");
    $(".modal-open").attr("class", "");
    this._router.navigate(['/Facturacion-DatosFiscales']);
  }
}