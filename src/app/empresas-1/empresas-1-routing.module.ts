import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Empresas1Page } from './empresas-1.page';

const routes: Routes = [
  {
    path: '',
    component: Empresas1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Empresas1PageRoutingModule {}
