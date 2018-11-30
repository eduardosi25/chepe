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
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  constructor(private location: Location,
    private translate: TranslateService,
    private model: ModelService,
    public session: SessionService,
    private router: Router) { }
    public paises: Country[] = [];
    public personName;public personLast;public email;public cellphone;public emergency;
    public flagName;public flagLast;
    public flagNext = null;public flagDisabled;
    public step4;

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
  static name_regex: RegExp = /^[A-Za-zÑñ\s]{2,30}$/;
  static lastname_regex: RegExp = /^[A-Za-zÑñ\s]{2,30}$/
  static cellphone_regex: RegExp = /^[0-9]{8,16}$/;
  static emergency_regex: RegExp = /^[0-9]{8,16}$/;
 
 
  public readyToGoNext(): boolean {
    $('.form-control').removeClass('orange');
    for (var i = 0; i < this.session.rb.persons.length; i++) {
      let p: Person = this.session.rb.persons[i];
      this.personName = p.name;
      this.personLast = p.lastname;
      
      this.pName();
      this.pLast();
      
      if (!p.name || this.flagName == true) { $('#p_' + i + '_name').addClass('orange');this.step4 = this.translate.instant('Step4-P34');this.flagNext=true; this.flagDisabled= true ;return true; }
      if (!p.lastname || this.flagLast == true) { $('#p_' + i + '_lastname').addClass('orange');this.step4 = this.translate.instant('Step4-P34');this.flagNext=true; this.flagDisabled= true ;return true; }
      if(!p.country){$('#p_'+i+'_country').addClass('orange');return true;}
    }
      this.email = this.session.rb.etickets_email;
      this.cellphone = this.session.rb.etickets_phone;
      this.emergency = this.session.rb.etickets_emergency_contact;
    
    
    if (!this.session.rb.etickets_email) { $('#etickets_email').addClass('orange');this.step4 = this.translate.instant('Step4-P34');this.flagNext=true; this.flagDisabled= true ; return true; }
    else if (!Step4Component.email_regex.test(this.session.rb.etickets_email)) { $('#etickets_email').addClass('orange');this.step4 = this.translate.instant('Step4-P31');this.flagNext=true; this.flagDisabled= true ;return true; }
    else if (!this.session.rb.etickets_email2) { $('#etickets_email2').addClass('orange');this.step4 = this.translate.instant('Step4-P34');this.flagNext=true;this.flagDisabled= true ; return true; }
    else if (this.session.rb.etickets_email2 != this.session.rb.etickets_email) { $('#etickets_email2').addClass('orange');this.step4 = this.translate.instant('Step4-P30');this.flagNext=true; this.flagDisabled= true ;return true; }
    else if (!this.session.rb.etickets_phone){$('#etickets_phone').addClass('orange');this.step4 = this.translate.instant('Step4-P34');this.flagNext=true;this.flagDisabled= true ;return true;}
    else if (!Step4Component.cellphone_regex.test(this.session.rb.etickets_phone)){$('#etickets_phone').addClass('orange');this.step4 = this.translate.instant('Step4-P32');this.flagNext=true;this.flagDisabled= true ;return true;}
    else if (!this.session.rb.etickets_emergency_contact){$('#etickets_emergency_contact').addClass('orange');this.step4 = this.translate.instant('Step4-P34');this.flagNext=true;this.flagDisabled= true ;return true;}
    else if (!Step4Component.emergency_regex.test(this.session.rb.etickets_emergency_contact)){$('#etickets_emergency_contact').addClass('orange');this.step4 = this.translate.instant('Step4-P33');this.flagNext=true;this.flagDisabled= true ;return true;}
    else if (this.session.rb.pp == false){$('#pp').addClass('orange');this.step4 = this.translate.instant('Step4-P34');this.flagNext=true;this.flagDisabled= true ;return true;}
    else { this.flagDisabled = null; this.step4 = this.translate.instant('Step4-P25'); return true; }
    
  }



  public pName(){
    if(typeof this.personName != 'undefined'){
    this.personName= this.personName.replace(/^\s+|\s+$/g, "");
   if( !Step4Component.name_regex.test(this.personName)){this.flagName = true}
   else (this.flagName = null)
    }
  }

  public pLast(){
    if(typeof this.personLast != 'undefined'){
    this.personLast= this.personLast.replace(/^\s+|\s+$/g, "");
   if( !Step4Component.lastname_regex.test(this.personLast)){this.flagLast = true}
   else (this.flagLast = null)
    }
  }
  //  public getCountry(){
  //     this.model.getCountries().subscribe((response:Response<Country>) => {
  //        return response.data;
  //    });
  //  }
}
