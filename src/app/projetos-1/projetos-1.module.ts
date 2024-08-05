import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Projetos1PageRoutingModule } from './projetos-1-routing.module';

import { Projetos1Page } from './projetos-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Projetos1PageRoutingModule,

  ],
  declarations: [Projetos1Page]
})
export class Projetos1PageModule {}
