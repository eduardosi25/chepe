import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './rch/main/main.component';
import { Step1Component } from './rch/step1/step1.component';
import { Step2Component } from './rch/step2/step2.component';
import { Step3Component } from './rch/step3/step3.component';
import { Step4Component } from './rch/step4/step4.component';
import { Step5Component } from './rch/step5/step5.component';
import { CommitComponent } from './rch/commit/commit.component';
import { ReceiptComponent } from './rch/receipt/receipt.component';
import { Step2bComponent } from './rch/step2b/step2b.component';
import { PaymentComponent } from './rch/payment/payment.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: ':route_name/paso1', component: Step1Component },
  { path: ':route_name/paso2', component: Step2Component },
  { path: ':route_name/paso2b', component: Step2bComponent },
  { path: ':route_name/paso3', component: Step3Component },
  { path: ':route_name/paso4', component: Step4Component },
  { path: ':route_name/paso5', component: Step5Component },
  { path: ':route_name/confirmar', component: CommitComponent },
  { path: ':route_name/pago', component:PaymentComponent},
  { path: ':route_name/reservación-exitosa', component:ReceiptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RchRoutingModule { }
