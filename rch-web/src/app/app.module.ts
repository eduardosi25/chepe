import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { PaymentComponent } from './rch/payment/payment.component';



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
    //PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
