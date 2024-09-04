import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms'

import { CadastraCategoriaPageRoutingModule } from './cadastra-categoria-routing.module';

import { CadastraCategoriaPage } from './cadastra-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastraCategoriaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CadastraCategoriaPage]
})
export class CadastraCategoriaPageModule { }
