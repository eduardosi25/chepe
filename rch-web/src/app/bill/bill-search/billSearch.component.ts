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
  public pdf;
  public xml;
  public folio;
  constructor(){}


  ngOnInit() {
    this.pdf = sessionStorage.getItem('pdf');
    this.folio = sessionStorage.getItem('folio');
    this.xml = sessionStorage.getItem('xml');
  }


clickPdf(){
    const linkSource = `data:application/pdf;base64,${this.pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = this.folio + ".pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  clickXml(){
    const linkSource = `data:application/csv;base64,${this.xml}`;
    const downloadLink = document.createElement("a");
    const fileName = this.folio + ".xml";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}