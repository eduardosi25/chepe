import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { AirlinesComponent } from './info/guide/airlines/airlines.component';
import { HotelsComponent } from './info/guide/hotels/hotels.component';
import { ScheduleComponent } from './info/guide/schedule/schedule.component';
import { ScheduleRegionalComponent } from './info/guide/schedule-regional/schedule-regional.component';
import { TestimonialsComponent } from './info/guide/testimonials/testimonials.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { HttpClient } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    GuideRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AirlinesComponent,
    HotelsComponent,
    ScheduleComponent,
    ScheduleRegionalComponent,
    TestimonialsComponent]
})
export class GuideModule { }
