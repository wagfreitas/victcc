import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Empresas1PageRoutingModule } from './empresas-1-routing.module';

import { Empresas1Page } from './empresas-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Empresas1PageRoutingModule
  ],
  declarations: [Empresas1Page]
})
export class Empresas1PageModule {}
