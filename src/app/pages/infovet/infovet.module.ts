import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfovetPageRoutingModule } from './infovet-routing.module';

import { InfovetPage } from './infovet.page';
import { MisdirectivasModule } from 'src/app/utils/directivas/directivas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfovetPageRoutingModule,
    MisdirectivasModule
  ],
  declarations: [InfovetPage]
})
export class InfovetPageModule {}
