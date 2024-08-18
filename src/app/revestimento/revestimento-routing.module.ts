import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevestimentoPage } from './revestimento.page';

const routes: Routes = [
  {
    path: '',
    component: RevestimentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevestimentoPageRoutingModule {}
