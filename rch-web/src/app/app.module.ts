import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
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
import { IndexComponent } from './info/index/index.component';
import { ChepeExpressComponent } from './info/trains/chepe-express/chepe-express.component';
import { ChepeRegionalComponent } from './info/trains/chepe-regional/chepe-regional.component';
import { TimesFaresComponent } from './info/trains/times-fares/times-fares.component';
import { GalleryComponent } from './info/trains/gallery/gallery.component';
import { UrikeComponent } from './info/trains/urike/urike.component';
import { DestinationsComponent } from './info/attractions/destinations/destinations.component';
import { BahuichivoComponent } from './info/attractions/destinations/bahuichivo/bahuichivo.component';
import { BarrancasCobreComponent } from './info/attractions/destinations/barrancas-cobre/barrancas-cobre.component';
import { ChihuahuaComponent } from './info/attractions/destinations/chihuahua/chihuahua.component';
import { NativeCommunitiesComponent } from './info/attractions/native-communities/native-communities.component';
import { CreelComponent } from './info/attractions/destinations/creel/creel.component';
import { CuauhtemocComponent } from './info/attractions/destinations/cuauhtemoc/cuauhtemoc.component';
import { ElFuerteComponent } from './info/attractions/destinations/el-fuerte/el-fuerte.component';
import { LosMochisComponent } from './info/attractions/destinations/los-mochis/los-mochis.component';
import { ChepexploraComponent } from './info/attractions/chepexplora/chepexplora.component';
import { DetailsComponent } from './info/attractions/chepexplora/details/details.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
    IndexComponent,
    ChepeExpressComponent,
    ChepeRegionalComponent,
    TimesFaresComponent,
    GalleryComponent,
    UrikeComponent,
    DestinationsComponent,
    BahuichivoComponent,
    BarrancasCobreComponent,
    ChihuahuaComponent,
    NativeCommunitiesComponent,
    CreelComponent,
    CuauhtemocComponent,
    ElFuerteComponent,
    LosMochisComponent,
    ChepexploraComponent,
    DetailsComponent
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
