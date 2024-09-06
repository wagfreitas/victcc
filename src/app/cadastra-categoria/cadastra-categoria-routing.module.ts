import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastraCategoriaPage } from './cadastra-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: CadastraCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastraCategoriaPageRoutingModule {}
