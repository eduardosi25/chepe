import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './info/index/index.component';
import { ContactComponent } from './info/contact/contact.component';
import { HistoryComponent } from './info/history/history.component';
import { TacComponent } from './info/tac/tac.component';
import { FaqComponent } from './info/faq/faq.component';
import { LegalAdviceComponent } from './info/legal-advice/legal-advice.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'trenes', loadChildren:'app/trains.module#TrainsModule' },
  { path: 'atracciones', loadChildren:'app/attractions.module#AttractionsModule' },
  { path: 'reservaciones', loadChildren:'app/rch.module#RchModule' },
  { path: 'guia-de-viaje', loadChildren:'app/guide.module#GuideModule' },
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

