import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearcuentaPage } from './crearcuenta.page';

const routes: Routes = [
  {
    path: '',
    component: CrearcuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearcuentaPageRoutingModule {}
