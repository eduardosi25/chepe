import { Injectable } from '@angular/core';
import { AvailabilityQuery } from './model/availabilityquery';
import { AvailabilityQuery2 } from './model/availabilityquery2';
import { Route2 } from './model/Route2';
import { Segment } from './model/segment';
import { BillRequest } from './model/billRequest';
import { BillFiscal } from './model/billFiscal';
import { Schedule } from './model/schedule';
import { Subscription } from 'rxjs';
import {environment} from "../environments/environment";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'


@Injectable()
export class BillService {
  public bill;
  public fiscal;
  public bodyFiscal;
  private base:string=environment.restws_base;
  private prefix:string="/v1";
  private invoices = "/invoices?";
  private invoicesBill = "/invoices";

  constructor(private http: HttpClient
  ) {
  }
 
  public getReaquestBill(billReq) {
    const url = this.base + this.prefix + this.invoices + 'clave=' + billReq.clave + '&fecha=' + billReq.fecha + '&folio=' + '';
    return this.http.get(url,{ headers: this.setHeaders() });
  }
  public getReaquestFolioBill(billFolio) {
    const url = this.base + this.prefix + this.invoices + 'clave=' + '' + '&fecha=' + '' + '&folio=' + billFolio;
    return this.http.get(url,{ headers: this.setHeaders() });
  }

  public getFiscalRfcBill(rfc) {
    const url = this.base + this.prefix + this.invoicesBill + '/rfc/' + rfc;
    return this.http.get(url,{ headers: this.setHeaders() });
  }
  public getFiscalCfdiBill() {
    const url = this.base + this.prefix + this.invoicesBill + '/cfdi';
    return this.http.get(url,{ headers: this.setHeaders() });
  }


  setHeaders(){
    var headers = {
      'X-Rch-At':'vXykLvyM7VmfGZLNYn3D'
    };
    return headers
  }
}
