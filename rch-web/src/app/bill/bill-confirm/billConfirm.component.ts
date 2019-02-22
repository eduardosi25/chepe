import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute}from '@angular/router';

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

  constructor(private _router:Router,){}


  ngOnInit() {


  }
  onSubmit(){
    this._router.navigate(['/Facturacion-DatosFiscales']);
  }

}