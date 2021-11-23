import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModveterinariaPage } from './modveterinaria.page';

const routes: Routes = [
  {
    path: '',
    component: ModveterinariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModveterinariaPageRoutingModule {}
