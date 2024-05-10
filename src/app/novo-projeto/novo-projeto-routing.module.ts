import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoProjetoPage } from './novo-projeto.page';

const routes: Routes = [
  {
    path: '',
    component: NovoProjetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoProjetoPageRoutingModule {}
