import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainsRoutingModule } from './trains-routing.module';
import { ChepeExpressComponent } from './info/trains/chepe-express/chepe-express.component';
import { ChepeRegionalComponent } from './info/trains/chepe-regional/chepe-regional.component';
import { TimesFaresComponent } from './info/trains/times-fares/times-fares.component';
import { GalleryComponent } from './info/trains/gallery/gallery.component';
import { UrikeComponent } from './info/trains/urike/urike.component';

@NgModule({
  imports: [
    CommonModule,
    TrainsRoutingModule
  ],
  declarations: [
    ChepeExpressComponent,
    ChepeRegionalComponent,
    TimesFaresComponent,
    GalleryComponent,
    UrikeComponent
  ]
})
export class TrainsModule { }
