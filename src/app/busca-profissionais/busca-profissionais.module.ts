import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscaProfissionaisPageRoutingModule } from './busca-profissionais-routing.module';

import { BuscaProfissionaisPage } from './busca-profissionais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscaProfissionaisPageRoutingModule
  ],
  declarations: [BuscaProfissionaisPage]
})
export class BuscaProfissionaisPageModule {}
