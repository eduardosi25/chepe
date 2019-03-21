import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { IndexComponent } from './info/index/index.component';
import { ContactComponent } from './info/contact/contact.component';
import { HistoryComponent } from './info/history/history.component';
import { TacComponent } from './info/tac/tac.component';
import { FaqComponent } from './info/faq/faq.component';
import { LegalAdviceComponent } from './info/legal-advice/legal-advice.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaymentComponent } from './rch/payment/payment.component';
import { PreviousRouteService } from './previous-route.service';
import { TacExpressComponent } from './info/tac-express/tac-express.component';
import { BillRequestComponent } from './bill/bill-request/billRequest.component';
import { BillConfirmComponent } from './bill/bill-confirm/billConfirm.component';
import { BillFiscalComponent } from './bill/bill-fiscal/billFiscal.component';
import { BillSearchComponent } from './bill/bill-search/billSearch.component';
import { BillService } from './billSession.service';
import { LegalExpressComponent } from './info/legal/express/legal-express.component'
import { LegalRegionalComponent } from './info/legal/regional/legal-regional.component'
import { OwlModule } from 'ngx-owl-carousel';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    ContactComponent,
    HistoryComponent,
    TacComponent,
    FaqComponent,
    LegalAdviceComponent,
    TacExpressComponent,
    BillRequestComponent,
    BillConfirmComponent,
    BillFiscalComponent,
    BillSearchComponent,
    LegalExpressComponent,
    LegalRegionalComponent
    
    //PaymentComponent
  ],
  providers:[PreviousRouteService, BillService],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OwlModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent],
  exports: [
    TranslateModule
  ]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}