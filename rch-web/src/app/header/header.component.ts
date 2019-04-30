import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
/** Inicializa variable para poder usar jquery en componente */
declare var $: any;
/** componente header principal, este componente tiene su funcionalidad mayoritariamente en el html, trae links a componentes */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(private router: Router, private translate: TranslateService) { }

  ngOnInit() {

    // Cambio de clase active en lenguaje
    $('.js-toggle-lang').click(function(e) {
// tslint:disable-next-line:quotemark
      $(".js-toggle-lang").removeClass("active");
      $(this).addClass('active');
    });
  }
  public getHeaderClasses() {
    const shurls = ['/contacto', '/guia-de-viaje', '/reservaciones', '/preguntas-frecuentes', 'terminos-y-condiciones', '/aviso-legal'];
    for (let i = 0; i < shurls.length; i++) {
      const shurl = shurls[i];
      if (this.router.url.indexOf(shurl) != -1) {
        return ['navbar-affix-height-small'];
      }
    }
    return [];
  }
  /** cambia el lenguaje solicitado por el usuario */
  public switchLanguage(language: string) {
    this.translate.use(language);
  }
}
