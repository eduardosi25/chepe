import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlinesComponent } from './info/guide/airlines/airlines.component';
import { HotelsComponent } from './info/guide/hotels/hotels.component';
import { ScheduleComponent } from './info/guide/schedule/schedule.component';
import { ScheduleRegionalComponent } from './info/guide/schedule-regional/schedule-regional.component';
import { TestimonialsComponent } from './info/guide/testimonials/testimonials.component';

const routes: Routes = [
  { path: 'conexiones-aereas', component: AirlinesComponent },
  { path: 'hoteles', component: HotelsComponent },
  { path: 'itinerarios-sugeridos', component: ScheduleComponent },
  { path: 'itinerarios-sugeridos/regional', component: ScheduleRegionalComponent },
  { path: 'testimonios', component: TestimonialsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule { }
