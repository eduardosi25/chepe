import { Component, OnInit } from '@angular/core';
/** Inicializa variable para poder usar jquery en componente */
declare var $:any;
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.scriptInit();
  }
  scriptInit(){
    $('.input-group.date').datepicker({
      format: "dd/mm/yyyy",
      language: "es",
      orientation: "bottom left",
      todayHighlight: true
    });
  }

}
