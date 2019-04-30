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
  constructor() { }

/**Obtiene lo que se encuentra en el sessionStorage que es el base64 del pdf, xml y tambien obtiene el folio */
  ngOnInit() {
    this.pdf = sessionStorage.getItem('pdf');
    this.folio = sessionStorage.getItem('folio');
    this.xml = sessionStorage.getItem('xml');
  }
/**Función para convertir el base64 a pdf y descargarlo */
  clickPdf() {
    const linkSource = `data:application/pdf;base64,${this.pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = this.folio + ".pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
/**Función para convertir el base64 a xml y descargarlo */
  clickXml() {
    const linkSource = `data:application/csv;base64,${this.xml}`;
    const downloadLink = document.createElement("a");
    const fileName = this.folio + ".xml";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}