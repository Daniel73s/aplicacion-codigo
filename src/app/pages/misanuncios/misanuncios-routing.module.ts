import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisanunciosPage } from './misanuncios.page';

const routes: Routes = [
  {
    path: '',
    component: MisanunciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisanunciosPageRoutingModule {}
