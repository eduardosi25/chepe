import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-cost-box',
  templateUrl: './cost-box.component.html',
  styleUrls: ['./cost-box.component.css']
})
export class CostBoxComponent implements OnInit {

  constructor(public session:SessionService) { }
/**Este componente lo que hace es mostrar el cuadro donde se muestran lo costos del viaje*/
  ngOnInit() {
  }

}
