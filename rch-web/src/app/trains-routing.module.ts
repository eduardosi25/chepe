import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChepeExpressComponent } from './info/trains/chepe-express/chepe-express.component';
import { ChepeRegionalComponent } from './info/trains/chepe-regional/chepe-regional.component';
import { TimesFaresComponent } from './info/trains/times-fares/times-fares.component';
import { GalleryComponent } from './info/trains/gallery/gallery.component';
import { UrikeComponent } from './info/trains/urike/urike.component';

const routes: Routes = [
  { path: 'chepe-express', component: ChepeExpressComponent },
  { path: 'chepe-regional', component: ChepeRegionalComponent },
  { path: 'horarios-tarifas', component: TimesFaresComponent },
  { path: 'galeria', component: GalleryComponent },
  { path: 'trenes/restaurante-urike', component: UrikeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainsRoutingModule { }
