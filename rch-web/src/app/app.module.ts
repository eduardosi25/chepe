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
import { SessionService } from './session.service';
import { FormsModule} from '@angular/forms';


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
    CommitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ModelService,ModelDummyService,ModelRestService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
