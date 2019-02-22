import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $: any;
@NgModule({
  imports: [HttpClient]
})
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class BillErrorModalComponent implements OnInit {

  constructor(){}


  ngOnInit() {


  }

}