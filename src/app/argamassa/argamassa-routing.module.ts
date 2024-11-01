import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArgamassaPage } from './argamassa.page';

const routes: Routes = [
  {
    path: '',
    component: ArgamassaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArgamassaPageRoutingModule {}
