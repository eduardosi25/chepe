import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../model.service';
import { SessionService } from '../../session.service';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Schedule } from '../../model/schedule';
import { Segment } from '../../model/segment';
import { Response } from '../../model/response';
import { TrainStop } from '../../model/trainstop';
import { Travel } from '../../model/travel';
import { AvailabilityQuery } from '../../model/availabilityquery';
import { RouteBooking } from '../../model/routebooking';
import { Person } from '../../model/person';
import { Country } from '../../model/country';
declare var $: any;
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  constructor(private location: Location,
    private model: ModelService,
    public session: SessionService,
    private router: Router) { }
    public paises: Country[] = [];
    public per;
    public flag;
    public perl;
    public flagl;

  public segments: Segment[] = [];
  ngOnInit() {
    if (!this.session || !this.session.query || !this.session.route || !this.session.segments) {
      this.router.navigate(["/reservaciones"]); return;
    }
    this.model.getCountries().subscribe((response:Response<Country[]>) => { 
      response.data.forEach(item => {
        this.paises.push(item);
      });
  });
    if (this.session.rb == null) {
      this.session.rb = new RouteBooking();
      this.session.rb.setupFromSession(this.session);
    }
    this.segments = this.session.mkUnifiedSegments();
  }
  goBack(): void {
    this.location.back();
  }
  static email_regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static name_regex: RegExp = /^[a-zA-ZñÑ]{2,30}$/;
  static lastname_regex: RegExp = /^[a-zA-ZñÑ]{2,30}$/;
  static cellphone_regex: RegExp = /[0-9]{9,9}/;
  public readyToGoNext(): boolean {
    $('.form-control').removeClass('orange');
    for (var i = 0; i < this.session.rb.persons.length; i++) {
      let p: Person = this.session.rb.persons[i];
      this.per = p.name
      this.perl = p.lastname
      this.name();
      this.last();
      if (!p.name || this.flag == true) { $('#p_' + i + '_name').addClass('orange'); return false; }
      if (!p.lastname || this.flagl == true) { $('#p_' + i + '_lastname').addClass('orange'); return false; }
      if(!p.country){$('#p_'+i+'_country').addClass('orange');return false;}
    }

    if (!Step4Component.email_regex.test(this.session.rb.etickets_email)) { $('#etickets_email').addClass('orange'); return false; }
    if (this.session.rb.etickets_email2 != this.session.rb.etickets_email) { $('#etickets_email2').addClass('orange'); return false; }
    if(this.session.rb.etickets_phone == "" || !Step4Component.cellphone_regex.test(this.session.rb.etickets_phone)){$('#etickets_phone').addClass('orange');return false;}
    return this.session.rb.pp;
  }
  public name(){
    if(typeof this.per != 'undefined'){
    this.per= this.per.replace(/^\s+|\s+$/g, "");
   if( !Step4Component.name_regex.test(this.per)){this.flag = true}
   else (this.flag = null)
    }
  }

  public last(){
    if(typeof this.perl != 'undefined'){
    this.perl= this.perl.replace(/^\s+|\s+$/g, "");
   if( !Step4Component.lastname_regex.test(this.perl)){this.flagl = true}
   else (this.flagl = null)
    }
  }
  //  public getCountry(){
  //     this.model.getCountries().subscribe((response:Response<Country>) => {
  //        return response.data;
  //    });
  //  }
}
