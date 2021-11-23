import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeterinariasPageRoutingModule } from './veterinarias-routing.module';

import { VeterinariasPage } from './veterinarias.page';
import { PipesModule } from '../../utils/pipes/pipes.module';
import { MisdirectivasModule } from 'src/app/utils/directivas/directivas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    VeterinariasPageRoutingModule,
    MisdirectivasModule
  ],
  declarations: [VeterinariasPage]
})
export class VeterinariasPageModule {}
