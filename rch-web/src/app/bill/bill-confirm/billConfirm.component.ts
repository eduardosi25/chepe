import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BillRequest } from './../../model/billRequest'
import { BillService } from './../../billSession.service'

import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
@NgModule({
  imports: [HttpClient]
})
@Component({
  selector: 'app-billConfirm',
  templateUrl: './billConfirm.component.html',
  styleUrls: ['./billConfirm.component.css']
})
export class BillConfirmComponent implements OnInit {
  public requestBill;
  public fiscBill;
  public total;
  constructor(private _router: Router, private serviceBill: BillService) { }

  /**Valida que existan datos en el sessionStorage y obtiene todos los datos que se encuentran en el, si no tien te manda a la pantalla principal. */
  ngOnInit() {
    var Paso1Session = sessionStorage.getItem('billRequest');
    var Paso1SessionInfo = sessionStorage.getItem('billRequestInfo');
    if (Paso1SessionInfo == undefined || Paso1SessionInfo == null || Paso1SessionInfo == "") {
      this._router.navigate(['/Facturacion']);
    }
    this.requestBill = JSON.parse(Paso1SessionInfo);
    this.fiscBill = JSON.parse(Paso1Session);
    this.total = this.fiscBill.monto_neto + this.fiscBill.impuestos;
    sessionStorage.removeItem('billRequest');
    sessionStorage.removeItem('billRequestInfo')
  }
  /**Manda la información al sessionStorage y manda a la pantalla de Facturacion-DatosFiscales */
  onSubmit() {
    sessionStorage.setItem('billRequest', JSON.stringify(this.fiscBill));
    sessionStorage.setItem('billRequestInfo', JSON.stringify(this.requestBill));
    this._router.navigate(['/Facturacion-DatosFiscales']);
  }
}