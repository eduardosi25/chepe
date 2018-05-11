import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }
  public getHeaderClasses(){
    let shurls = ['/contacto','/guia-de-viaje','/reservaciones','/preguntas-frecuentes','terminos-y-condiciones','/aviso-legal'];
    for(var i=0;i<shurls.length;i++){
      let shurl = shurls[i];
      if(this.router.url.indexOf(shurl) != -1){
        return ['navbar-affix-height-small'];
      }
    }
    return [];
  }

}
