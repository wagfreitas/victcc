import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GessoPage } from './gesso.page';

const routes: Routes = [
  {
    path: '',
    component: GessoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GessoPageRoutingModule {}
