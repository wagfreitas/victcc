import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelhaPageRoutingModule } from './telha-routing.module';

import { TelhaPage } from './telha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelhaPageRoutingModule
  ],
  declarations: [TelhaPage]
})
export class TelhaPageModule {}
