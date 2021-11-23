import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnuncioPageRoutingModule } from './anuncio-routing.module';

import { AnuncioPage } from './anuncio.page';
import { MisdirectivasModule } from 'src/app/utils/directivas/directivas.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnuncioPageRoutingModule,
    MisdirectivasModule
  ],
  declarations: [AnuncioPage]
})
export class AnuncioPageModule {}
