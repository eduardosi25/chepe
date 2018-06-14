import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinationsComponent } from './info/attractions/destinations/destinations.component';
import { NativeCommunitiesComponent } from './info/attractions/native-communities/native-communities.component';
import { BahuichivoComponent } from './info/attractions/destinations/bahuichivo/bahuichivo.component';
import { BarrancasCobreComponent } from './info/attractions/destinations/barrancas-cobre/barrancas-cobre.component';
import { CreelComponent } from './info/attractions/destinations/creel/creel.component';
import { CuauhtemocComponent } from './info/attractions/destinations/cuauhtemoc/cuauhtemoc.component';
import { ElFuerteComponent } from './info/attractions/destinations/el-fuerte/el-fuerte.component';
import { LosMochisComponent } from './info/attractions/destinations/los-mochis/los-mochis.component';
import { ChepexploraComponent } from './info/attractions/chepexplora/chepexplora.component';
import { DetailsComponent } from './info/attractions/chepexplora/details/details.component';
import { ChihuahuaComponent } from './info/attractions/destinations/chihuahua/chihuahua.component';

const routes: Routes = [
  { path: 'destinos-y-actividades', component: DestinationsComponent },
  { path: 'comunidades-indigenas', component: NativeCommunitiesComponent },
  { path: 'destinos-y-actividades/bahuichivo', component: BahuichivoComponent },
  { path: 'destinos-y-actividades/barrancas-cobre', component: BarrancasCobreComponent },
  { path: 'destinos-y-actividades/creel', component: CreelComponent },
  { path: 'destinos-y-actividades/chihuahua', component: ChihuahuaComponent },
  { path: 'destinos-y-actividades/cuauhtemoc', component: CuauhtemocComponent },
  { path: 'destinos-y-actividades/el-fuerte', component: ElFuerteComponent },
  { path: 'destinos-y-actividades/los-mochis', component: LosMochisComponent },
  { path: 'chepexplora', component: ChepexploraComponent },
  { path: 'chepexplora/detalles', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttractionsRoutingModule { }
