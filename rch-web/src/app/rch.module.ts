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
@NgModule({
  imports: [
    CommonModule,
    RchRoutingModule
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
  ]
})
export class RchModule { }
