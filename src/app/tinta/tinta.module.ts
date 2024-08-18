import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TintaPageRoutingModule } from './tinta-routing.module';

import { TintaPage } from './tinta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TintaPageRoutingModule
  ],
  declarations: [TintaPage]
})
export class TintaPageModule {}
