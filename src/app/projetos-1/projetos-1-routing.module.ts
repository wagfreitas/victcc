import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Projetos1Page } from './projetos-1.page';

const routes: Routes = [
  {
    path: '',
    component: Projetos1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Projetos1PageRoutingModule {}
