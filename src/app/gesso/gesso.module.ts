import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GessoPageRoutingModule } from './gesso-routing.module';

import { GessoPage } from './gesso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GessoPageRoutingModule
  ],
  declarations: [GessoPage]
})
export class GessoPageModule {}
