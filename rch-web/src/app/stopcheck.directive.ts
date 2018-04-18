import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TrainStop } from './model/trainstop';

@Directive({
  selector: '[appStopcheck]'
})
export class StopcheckDirective implements OnInit {
  @Input('appStopcheck') train_stop: TrainStop;
  el:ElementRef;
  constructor(el: ElementRef) {
    this.el = el;
  }
  ngOnInit(){
    this.getCoordinates(this.train_stop,this.el);
  }
  public getCoordinates(ts:TrainStop,el:ElementRef){
    if(ts.px >= 0 && ts.py >= 0){
      //let styles:string = "left:"+(ts.px*100)+"%;top:"+(ts.py*100)+"%;";
      //return this.sanitizer.bypassSecurityTrustStyle(styles);  
      this.apply(el,ts.px,ts.py);
      return;
    }
    let map={
      x0:26.319957,
      y0:-106.379820,
      x1:29.835939,
      y1:-111.068201
    }
    let xdif:number = map.x1-map.x0;
    let ydif:number = map.y1-map.y0;
    var px:number = (ts.latitude-map.x0)/xdif;
    var py:number = (ts.longitude-map.y0)/ydif;
    ts.px = px; ts.py = py;
    //let styles:string = "left:"+(px*100)+"%;top:"+(py*100)+"%;";

    //return this.sanitizer.bypassSecurityTrustStyle(styles);
    this.apply(el,ts.px,ts.py);
  }
  apply(el:ElementRef,px:number,py:number){
    el.nativeElement.style.left = ''+(px*100)+'%';
    el.nativeElement.style.top = ''+(py*100)+'%';
  }
}
