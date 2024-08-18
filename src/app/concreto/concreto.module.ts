import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcretoPageRoutingModule } from './concreto-routing.module';

import { ConcretoPage } from './concreto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcretoPageRoutingModule
  ],
  declarations: [ConcretoPage]
})
export class ConcretoPageModule {}
