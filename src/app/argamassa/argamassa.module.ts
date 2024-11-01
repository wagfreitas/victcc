import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArgamassaPageRoutingModule } from './argamassa-routing.module';

import { ArgamassaPage } from './argamassa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArgamassaPageRoutingModule
  ],
  declarations: [ArgamassaPage]
})
export class ArgamassaPageModule {}
