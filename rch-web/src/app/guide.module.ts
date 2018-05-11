import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { AirlinesComponent } from './info/guide/airlines/airlines.component';
import { HotelsComponent } from './info/guide/hotels/hotels.component';
import { ScheduleComponent } from './info/guide/schedule/schedule.component';
import { ScheduleRegionalComponent } from './info/guide/schedule-regional/schedule-regional.component';
import { TestimonialsComponent } from './info/guide/testimonials/testimonials.component';
@NgModule({
  imports: [
    CommonModule,
    GuideRoutingModule,
    AirlinesComponent,
    HotelsComponent,
    ScheduleComponent,
    ScheduleRegionalComponent,
    TestimonialsComponent
  ],
  declarations: []
})
export class GuideModule { }
