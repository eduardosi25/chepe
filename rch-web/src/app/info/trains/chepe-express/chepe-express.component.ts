import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chepe-express',
  templateUrl: './chepe-express.component.html',
  styleUrls: ['./chepe-express.component.css']
})
export class ChepeExpressComponent implements OnInit {

  kind : any[] = [
    {
      "rute" : "assets/img/icon_menu1.png",
      "text" : "DESAYUNO",
      "pdf" : ""
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
