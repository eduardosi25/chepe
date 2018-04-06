import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { SessionService } from '../../session.service';
import { BrowserModule }  from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Schedule } from '../../model/schedule';
import { Segment } from '../../model/segment';
import { Response } from '../../model/response';
import { TrainStop } from '../../model/trainstop';
import { Travel } from '../../model/travel';
import { AvailabilityQuery } from '../../model/availabilityquery';
import { RouteBooking } from '../../model/routebooking';
import { Person } from '../../model/person';
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  constructor(private location:Location, 
    private model:ModelService, 
    public session:SessionService) { }

  ngOnInit() {
    this.session.rb = new RouteBooking();
    this.session.rb.setupFromSession(this.session);
    
    
  }
  goBack(): void {
    this.location.back();
  }
  public readyToGoNext():boolean{
    for(var i=0;i<this.session.rb.persons.length;i++){
      let p:Person = this.session.rb.persons[i];
      if(p.country == ""){return false;}
      if(p.name == ""){return false;}
      if(p.lastname == ""){return false;}
    }
    if(this.session.rb.etickets_email == ""){return false;}
    if(this.session.rb.etickets_phone == ""){return false;}
    return this.session.rb.pp;
  }
}
