import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoProjetoPageRoutingModule } from './novo-projeto-routing.module';

import { NovoProjetoPage } from './novo-projeto.page';
import { ModalProjetoComponent } from '../modal-projeto/modal-projeto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoProjetoPageRoutingModule
  ],
  declarations: [NovoProjetoPage, ModalProjetoComponent]
})
export class NovoProjetoPageModule { }
