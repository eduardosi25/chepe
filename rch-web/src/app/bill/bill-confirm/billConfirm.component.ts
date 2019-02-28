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
  onSubmit() {
    sessionStorage.setItem('billRequest', JSON.stringify(this.fiscBill));
    sessionStorage.setItem('billRequestInfo', JSON.stringify(this.requestBill));
    this._router.navigate(['/Facturacion-DatosFiscales']);
  }

}