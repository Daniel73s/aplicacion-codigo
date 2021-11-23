import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisveterinariasPageRoutingModule } from './misveterinarias-routing.module';

import { MisveterinariasPage } from './misveterinarias.page';
import { MisdirectivasModule } from 'src/app/utils/directivas/directivas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisveterinariasPageRoutingModule,
    MisdirectivasModule
  ],
  declarations: [MisveterinariasPage]
})
export class MisveterinariasPageModule {}
