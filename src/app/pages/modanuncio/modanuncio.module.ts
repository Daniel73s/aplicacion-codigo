import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModanuncioPageRoutingModule } from './modanuncio-routing.module';

import { ModanuncioPage } from './modanuncio.page';
import { MisdirectivasModule } from 'src/app/utils/directivas/directivas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModanuncioPageRoutingModule,
    ReactiveFormsModule,
    MisdirectivasModule
  ],
  declarations: [ModanuncioPage]
})
export class ModanuncioPageModule {}
