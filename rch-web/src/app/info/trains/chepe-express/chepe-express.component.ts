import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-chepe-express',
  templateUrl: './chepe-express.component.html',
  styleUrls: ['./chepe-express.component.css']
})
export class ChepeExpressComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector('#' + f);
      if (element) {
        $('html, body').animate({
          scrollTop: $("#" + f).position().top - 80 // Means Less header height
        }, 1000);
      }
    });
  }

}
