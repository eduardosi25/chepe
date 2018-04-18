import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RchComponent } from './rch/rch.component';
import { Step1Component } from './rch/step1/step1.component';
import { MainComponent } from './rch/main/main.component';
import { Step2Component } from './rch/step2/step2.component';
import { Step3Component } from './rch/step3/step3.component';
import { Step4Component } from './rch/step4/step4.component';
import { Step5Component } from './rch/step5/step5.component';
import { CommitComponent } from './rch/commit/commit.component';
import { AppRoutingModule } from './/app-routing.module';
import { ModelService} from "./model.service";
import { ModelDummyService } from './model-dummy.service';
import { ModelRestService } from './model-rest.service';
import { ModelDummyRestService} from './model-dummy-rest.service';
import { SessionService } from './session.service';
import { FormsModule} from '@angular/forms';
import { ReceiptComponent } from './rch/receipt/receipt.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule, NgbDateAdapter, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateNativeAdapter } from './NgbDateNativeAdapter';
import { I18n, CustomDatepickerI18n } from './i18ndatepicker';
import { StatusComponent } from './rch/status/status.component';
import { StopcheckDirective } from './stopcheck.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RchComponent,
    Step1Component,
    MainComponent,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    CommitComponent,
    ReceiptComponent,
    StatusComponent,
    StopcheckDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [ModelService,ModelDummyService,ModelRestService,ModelDummyRestService,SessionService,{
    provide: RECAPTCHA_SETTINGS,
    useValue: { siteKey: '6LfMUFIUAAAAAFDSA3zsQ7F_1q7Lv5Fb8hxNqZGP' } as RecaptchaSettings,
  },{
    provide: RECAPTCHA_LANGUAGE,
    useValue: 'es', 
  },{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
