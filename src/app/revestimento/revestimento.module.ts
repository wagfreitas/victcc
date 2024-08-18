import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RevestimentoPageRoutingModule } from './revestimento-routing.module';

import { RevestimentoPage } from './revestimento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevestimentoPageRoutingModule
  ],
  declarations: [RevestimentoPage]
})
export class RevestimentoPageModule {}
