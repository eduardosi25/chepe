import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent }      from './rch/main/main.component';
import {Step1Component} from './rch/step1/step1.component';
import {Step2Component} from './rch/step2/step2.component';
import {Step3Component} from './rch/step3/step3.component';
import {Step4Component} from './rch/step4/step4.component';
import {Step5Component} from './rch/step5/step5.component';
import {CommitComponent} from './rch/commit/commit.component';
import {ReceiptComponent} from './rch/receipt/receipt.component';
import {IndexComponent} from './info/index/index.component';
import { ChepeExpressComponent } from './info/trains/chepe-express/chepe-express.component';
import { ChepeRegionalComponent } from './info/trains/chepe-regional/chepe-regional.component';
import { TimesFaresComponent } from './info/trains/times-fares/times-fares.component';
import { GalleryComponent } from './info/trains/gallery/gallery.component';
import { UrikeComponent } from './info/trains/urike/urike.component';
import { DestinationsComponent } from './info/attractions/destinations/destinations.component';
import { NativeCommunitiesComponent } from './info/attractions/native-communities/native-communities.component';
import { BahuichivoComponent } from './info/attractions/destinations/bahuichivo/bahuichivo.component';
import { BarrancasCobreComponent } from './info/attractions/destinations/barrancas-cobre/barrancas-cobre.component';
import { ChihuahuaComponent } from './info/attractions/destinations/chihuahua/chihuahua.component';
import { CreelComponent } from './info/attractions/destinations/creel/creel.component';
import { CuauhtemocComponent } from './info/attractions/destinations/cuauhtemoc/cuauhtemoc.component';
import { ElFuerteComponent } from './info/attractions/destinations/el-fuerte/el-fuerte.component';
import { LosMochisComponent } from './info/attractions/destinations/los-mochis/los-mochis.component';
import { ChepexploraComponent } from './info/attractions/chepexplora/chepexplora.component';
import { DetailsComponent } from './info/attractions/chepexplora/details/details.component';
import { ContactComponent } from './info/contact/contact.component';
import { HistoryComponent } from './info/history/history.component';
import { TacComponent } from './info/tac/tac.component';
import { AirlinesComponent } from './info/guide/airlines/airlines.component';
import { HotelsComponent } from './info/guide/hotels/hotels.component';
import { ScheduleComponent } from './info/guide/schedule/schedule.component';
import { ScheduleRegionalComponent } from './info/guide/schedule-regional/schedule-regional.component';
import { TestimonialsComponent } from './info/guide/testimonials/testimonials.component';
import { FaqComponent } from './info/faq/faq.component';
import { LegalAdviceComponent } from './info/legal-advice/legal-advice.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'trenes', loadChildren:'app/trains.module#TrainsModule' },
  { path: 'atracciones', loadChildren:'app/attractions.module#AttractionsModule' },
  { path: 'reservaciones', loadChildren:'app/rch.module#RchModule' },
  { path: 'guia-de-viaje/conexiones-aereas', component: AirlinesComponent },
  { path: 'guia-de-viaje/hoteles', component: HotelsComponent },
  { path: 'guia-de-viaje/itinerarios-sugeridos', component: ScheduleComponent },
  { path: 'guia-de-viaje/itinerarios-sugeridos/regional', component: ScheduleRegionalComponent },
  { path: 'guia-de-viaje/testimonios', component: TestimonialsComponent },
  { path: 'preguntas-frecuentes', component: FaqComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'historia', component: HistoryComponent },
  { path: 'terminos-y-condiciones', component: TacComponent },
  { path: 'aviso-legal', component: LegalAdviceComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}

