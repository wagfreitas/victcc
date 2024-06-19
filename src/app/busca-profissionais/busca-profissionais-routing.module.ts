import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscaProfissionaisPage } from './busca-profissionais.page';

const routes: Routes = [
  {
    path: '',
    component: BuscaProfissionaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscaProfissionaisPageRoutingModule {}
