import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChapiscoPageRoutingModule } from './chapisco-routing.module';

import { ChapiscoPage } from './chapisco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapiscoPageRoutingModule
  ],
  declarations: [ChapiscoPage]
})
export class ChapiscoPageModule {}
