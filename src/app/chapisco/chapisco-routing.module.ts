import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChapiscoPage } from './chapisco.page';

const routes: Routes = [
  {
    path: '',
    component: ChapiscoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapiscoPageRoutingModule {}
