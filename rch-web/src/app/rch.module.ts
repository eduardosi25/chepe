import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RchRoutingModule } from './rch-routing.module';
import { Step1Component } from './rch/step1/step1.component';
import { MainComponent } from './rch/main/main.component';
import { Step2Component } from './rch/step2/step2.component';
import { Step3Component } from './rch/step3/step3.component';
import { Step4Component } from './rch/step4/step4.component';
import { Step5Component } from './rch/step5/step5.component';
import { CommitComponent } from './rch/commit/commit.component';
import { ReceiptComponent } from './rch/receipt/receipt.component';
import { StatusComponent } from './rch/status/status.component';
import { ModelService} from "./model.service";
import { ModelDummyService } from './model-dummy.service';
import { ModelRestService } from './model-rest.service';
import { ModelDummyRestService} from './model-dummy-rest.service';
import { SessionService } from './session.service';
import { FormsModule} from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgbModule, NgbDateAdapter, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateNativeAdapter } from './NgbDateNativeAdapter';
import { I18n, CustomDatepickerI18n } from './i18ndatepicker';
import { StopcheckDirective } from './stopcheck.directive';
import { CostBoxComponent } from './rch/cost-box/cost-box.component';
import { Step2bComponent } from './rch/step2b/step2b.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { PaymentComponent } from './rch/payment/payment.component';
import { ConfirmComponent } from './rch/confirm/confirm.component';


@NgModule({
  imports: [
    CommonModule,
    RchRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    NgbModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    Step1Component,
    MainComponent,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    CommitComponent,
    ReceiptComponent,
    StatusComponent,
    StopcheckDirective,
    CostBoxComponent,
    Step2bComponent,
    PaymentComponent,
    ConfirmComponent
  ],
  providers: [ModelService,ModelDummyService,ModelRestService,ModelDummyRestService,SessionService,{
    provide: RECAPTCHA_SETTINGS,
    useValue: { siteKey: '6LdqDHQUAAAAAAMk2E3JQ8Y_dMFQxjC2vlstHAom' } as RecaptchaSettings,
  },{
    provide: RECAPTCHA_LANGUAGE,
    useValue: 'es', 
  },{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class RchModule { }
