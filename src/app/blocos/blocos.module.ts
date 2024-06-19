import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlocosPageRoutingModule } from './blocos-routing.module';

import { BlocosPage } from './blocos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlocosPageRoutingModule
  ],
  declarations: [BlocosPage]
})
export class BlocosPageModule {}
