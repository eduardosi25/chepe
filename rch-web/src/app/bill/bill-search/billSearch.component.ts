import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $: any;
@NgModule({
  imports: [HttpClient]
})
@Component({
  selector: 'app-billSearch',
  templateUrl: './billSearch.component.html',
  styleUrls: ['./billSearch.component.css']
})
export class BillSearchComponent implements OnInit {

  constructor(){}


  ngOnInit() {


  }

}