import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModveterinariaPageRoutingModule } from './modveterinaria-routing.module';

import { ModveterinariaPage } from './modveterinaria.page';
//AngularFireStorage
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MisdirectivasModule } from 'src/app/utils/directivas/directivas.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireStorageModule,
    ModveterinariaPageRoutingModule,
    ReactiveFormsModule,
    MisdirectivasModule
  ],
  declarations: [ModveterinariaPage]
})
export class ModveterinariaPageModule {}
