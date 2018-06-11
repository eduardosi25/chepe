import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.scriptInit();
  }
  scriptInit(){
    $(document).ready(function () {
      $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        orientation: "bottom left",
        todayHighlight: true
      });
      
      var enviado = GetURLParameter('enviado');
  
      if (enviado == "1") {
        alert('Su solicitud está siendo atendida por uno de nuestros ejecutivos, quien se pondrá en contacto con usted a la brevedad.');
      } else if (enviado == "0") {
        alert('Su mensaje no pudo ser enviado, favor de validar la información');
      }
    });
  
    function GetURLParameter(sParam) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
          return sParameterName[1];
        }
      }
    }
  }

}
