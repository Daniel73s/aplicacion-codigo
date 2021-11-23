import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisanunciosPageRoutingModule } from './misanuncios-routing.module';

import { MisanunciosPage } from './misanuncios.page';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';
import { MisdirectivasModule } from 'src/app/utils/directivas/directivas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    MisanunciosPageRoutingModule,
    MisdirectivasModule
  ],
  declarations: [MisanunciosPage]
})
export class MisanunciosPageModule {}
