import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearcuentaPageRoutingModule } from './crearcuenta-routing.module';

import { CrearcuentaPage } from './crearcuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrearcuentaPageRoutingModule
  ],
  declarations: [CrearcuentaPage]
})
export class CrearcuentaPageModule {}
