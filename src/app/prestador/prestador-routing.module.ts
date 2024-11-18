import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestadorPage } from './prestador.page';

const routes: Routes = [
  {
    path: '',
    component: PrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestadorPageRoutingModule {}
