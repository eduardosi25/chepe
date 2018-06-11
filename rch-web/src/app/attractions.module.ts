import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttractionsRoutingModule } from './attractions-routing.module';
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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { HttpClient } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    AttractionsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [DestinationsComponent,
    BahuichivoComponent,
    BarrancasCobreComponent,
    ChihuahuaComponent,
    NativeCommunitiesComponent,
    CreelComponent,
    CuauhtemocComponent,
    ElFuerteComponent,
    LosMochisComponent,
    ChepexploraComponent,
    DetailsComponent]
})
export class AttractionsModule { }
