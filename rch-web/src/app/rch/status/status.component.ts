import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModelService } from '../../model.service';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'rch-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit,OnDestroy {

  constructor(private model:ModelService) { }

  public status_ok:boolean = true;
  private alive:boolean = true;
  ngOnInit() {
    IntervalObservable.create(5000)
    .takeWhile(() => this.alive) // only fires when component is alive
    .subscribe(() => {
      this.model.getStatus().subscribe((data)=>{
        this.status_ok = data.data;
      });
    });
  }
  ngOnDestroy(){
    this.alive = false; // switches your IntervalObservable off
  }

}
