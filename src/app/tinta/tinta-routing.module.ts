import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TintaPage } from './tinta.page';

const routes: Routes = [
  {
    path: '',
    component: TintaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TintaPageRoutingModule {}
