import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelhaPage } from './telha.page';

const routes: Routes = [
  {
    path: '',
    component: TelhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelhaPageRoutingModule {}
