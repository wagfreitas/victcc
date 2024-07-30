import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlocosPage } from './blocos.page';

const routes: Routes = [
  {
    path: '',
    component: BlocosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlocosPageRoutingModule {}
