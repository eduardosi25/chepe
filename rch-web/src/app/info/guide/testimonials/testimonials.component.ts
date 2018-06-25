import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
    $("#iLDfHEl4Z").append('<li id="TCCpGj9sn1h" class="Rvc4LJlIz8"></li><a target="_blank" href="https://www.tripadvisor.com.mx/"><img src="https://www.tripadvisor.com.mx/img/cdsi/img2/branding/150_logo-11900-2.png" alt="TripAdvisor" /></a></li>');
  }

}
