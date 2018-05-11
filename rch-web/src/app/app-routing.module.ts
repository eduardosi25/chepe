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

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'trenes/chepe-express', component: ChepeExpressComponent },
  { path: 'trenes/chepe-regional', component: ChepeRegionalComponent },
  { path: 'trenes/horarios-tarifas', component: TimesFaresComponent },
  { path: 'trenes/galeria', component: GalleryComponent },
  { path: 'trenes/restaurante-urike', component: UrikeComponent },
  { path: 'atracciones/destinos-y-actividades', component: DestinationsComponent },
  { path: 'atracciones/comunidades-indigenas', component: NativeCommunitiesComponent },
  { path: 'atracciones/destinos-y-actividades/bahuichivo', component: BahuichivoComponent },
  { path: 'atracciones/destinos-y-actividades/barrancas-cobre', component: BarrancasCobreComponent },
  { path: 'atracciones/destinos-y-actividades/creel', component: CreelComponent },
  { path: 'atracciones/destinos-y-actividades/cuauhtemoc', component: CuauhtemocComponent },
  { path: 'atracciones/destinos-y-actividades/el-fuerte', component: ElFuerteComponent },
  { path: 'atracciones/destinos-y-actividades/los-mochis', component: LosMochisComponent },
  { path: 'atracciones/chepexplora', component: ChepexploraComponent },
  { path: 'atracciones/chepexplora/detalles', component: DetailsComponent },
  { path: 'reservaciones', component: MainComponent },
  { path: ':route_name/paso1', component: Step1Component },
  { path: ':route_name/paso2', component: Step2Component },
  { path: ':route_name/paso3', component: Step3Component },
  { path: ':route_name/paso4', component: Step4Component },
  { path: ':route_name/paso5', component: Step5Component },
  { path: ':route_name/confirmar', component: CommitComponent },
  { path: ':route_name/reservación-exitosa', component:ReceiptComponent},
  //{ path: 'guia-de-viaje/', component: CommitComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'historia', component: HistoryComponent },
  { path: 'terminos-y-condiciones', component: TacComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}

