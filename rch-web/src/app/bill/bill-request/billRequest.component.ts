import { Component, OnInit, NgModule, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'selenium-webdriver';
import { request } from 'http';
import { Router, ActivatedRoute}from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { NgForm } from '@angular/forms';
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
  public requestBill : {clave:"", fecha: ""};
  public folio;
  public billReq;
  constructor(private _router:Router,
    private translate: TranslateService,){}

  ngOnInit() {
    this.requestBill = {clave:"", fecha: ""};
    this.folio = "";
  }

  readyToGoNext(): boolean {
    if (this.requestBill.clave == undefined || this.requestBill.clave == '') { $('#claveReq').addClass('orange');this.billReq = this.translate.instant('Step4-P35');return true; }
  else { return true}
  }

  onSubmit(){
    console.log(this.requestBill)
    this._router.navigate(['/Facturacion-confirmacion']);
  }
  onSubmitSearch(){
    console.log(this.folio)
    this._router.navigate(['/Facturacion-Search']);
  }
}