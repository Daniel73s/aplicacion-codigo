import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddanuncioPageRoutingModule } from './addanuncio-routing.module';

import { AddanuncioPage } from './addanuncio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddanuncioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddanuncioPage]
})
export class AddanuncioPageModule {}
