import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModelService } from '../../model.service';
import { WebPayNotification } from '../../model/WebPayNotification';
import { Observable } from 'rxjs';
import { UrlWebPay } from '../../model/url';
/**Componente donde se valida si el pago fue satisfactorio o no */
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  content = {
    'title': '',
    'main': '',
    'extra': '',
    'reference': '',
    'operation_num': '',
    'auth_num': '',
    'code_resp': '',
    'nbError' : '',
    'amount' : '',
    'nombre' : '',
    'num_tarjeta' : '',
    'tipo_tarjeta' : '',
    'moneda' : ''
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private model:ModelService, 
  ) { }
  /**Se hace la validación del pago, si es satisfactoria la respuesta se muestra el modal de pago exitoso, de lo contrario se mostrara el modal de rechazado */
  ngOnInit() {
    // Obtenemos parametros de pago
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const nbResponse = params['nbResponse'];
      var referencia:number = params['referencia'];
      const operacion = params['operacion'];
      const nuAut = params['nuAut'];
      const nbError = params['nb_error'];
      const cdResponse = params['cdResponse'];
      var amount:string = params['importe'];
      var nombre:string;// = params['nombre'];
      var numTarjeta:string;// = params['num_tarjeta'];
      var tipoTarjeta:string = params['banco'];
      var moneda:string;// = params['moneda'];

      var wpNotif : WebPayNotification; 
      this.model.getPaymentNotification(referencia).subscribe((response:any) => {        
        console.log(wpNotif);
        // while (wpNotif == null || wpNotif.response == "" || wpNotif.response == undefined) {
        //   this.model.getPaymentNotification(referencia).subscribe((response:any) => {
            console.log(response);
            wpNotif = response.data;  
            amount = amount;
            numTarjeta = wpNotif.cc_number;
            tipoTarjeta = tipoTarjeta;
            moneda = "MXN";  
              // Si nbResponse = “Aprobado” y nuAut != “”
            if (nbResponse === 'Aprobado' && nuAut !== '') {
              this.content.title = 'Cobro Aprobado';
              this.content.reference = referencia.toString();
              this.content.nombre = nombre;
              this.content.amount = amount;
              this.content.moneda = moneda;
              this.content.num_tarjeta = numTarjeta;
              this.content.tipo_tarjeta = tipoTarjeta;
              this.content.auth_num = nuAut;
              this.content.operation_num = operacion;

              this.content.main = 'En breve recibirás tus boletos electrónicos <br /> y clave de reservación por correo electrónico.';
              this.content.extra = 'Te recomendamos imprimas tus boletos y los lleves <br/>contigo el día que vayas a abordar el tren. <br/>Gracias por tu preferencia';
            }

            // Si nbResponse = “Rechazado”
            else if (nbResponse === 'Rechazado') {
              this.content.title = 'Cobro declinado';
              this.content.main = 'No se realizó ningún cargo a su tarjeta';
              this.content.extra = 'La operación fue declinada por su banco emisor.\n Favor de intentar con otra tarjeta';
              this.content.code_resp = cdResponse;
              this.content.nbError = nbError;
              this.content.amount;
              this.content.num_tarjeta;
              this.content.title;
              this.content.nombre;
              this.content.moneda;
            }

            // Si no es rechazado o aprobado
            //if ((nbResponse !== 'Rechazado' && nbResponse !== 'Aprobado') || nuAut === '' ) {
            else{
              this.content.title = 'Lo sentimos, no podemos procesar el pago.';
              this.content.main = 'Favor de intentar mas tarde o contactar a nuestra área de Atención al Cliente.';
              this.content.extra = '';
            }
            // Si no se reciben los parámetros necesarios, redirect a reservaciones
            //if (nbResponse === undefined || nuAut === undefined) {
              //this.router.navigate(['/reservaciones']);
              //return;
            //}
            /* */
        //   });
        // }
      });
    });
  }
}
