import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    'auth_num': ''
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Obtenemos parametros de pago
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const nbResponse = params['nbResponse'];
      const referencia = params['referencia'];
      const operacion = params['operacion'];
      const nuAut = params['nuAut'];

      // Si no se reciben los parámetros necesarios, redirect a reservaciones
      if (nbResponse === undefined || nuAut === undefined) {
        this.router.navigate(['/reservaciones']);
        return;
      }

      // Si nbResponse = “Aprobado” y nuAut != “”
      if (nbResponse === 'Aprobado' && nuAut !== '') {
        this.content.title = 'Tu compra se realizó con éxito';
        this.content.main = 'En breve recibirás tus boletos electrónicos <br /> y clave de reservación por correo electrónico.';
        this.content.extra = 'Te recomendamos imprimas tus boletos y los lleves <br/>contigo el día que vayas a abordar el tren. <br/>Gracias por tu preferencia';
        this.content.reference = referencia;
        this.content.operation_num = operacion;
        this.content.auth_num = nuAut;
      }

      // Si nbResponse = “Rechazado”
      if (nbResponse === 'Rechazado') {
        this.content.title = 'Tu pago ha sido rechazado';
        this.content.main = 'Favor de comprobar con el banco emisor o intentar con otra tarjeta';
        this.content.extra = '';
      }

      // Si no es rechazado o aprobado
      if ((nbResponse !== 'Rechazado' && nbResponse !== 'Aprobado') || nuAut === '' ) {
        this.content.title = 'Lo sentimos, no podemos procesar el pago.';
        this.content.main = 'Favor de intentar mas tarde o contactar a nuestra área de Atención al Cliente.';
        this.content.extra = '';
      }

    });
  }

}
