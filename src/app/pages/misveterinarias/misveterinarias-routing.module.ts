import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisveterinariasPage } from './misveterinarias.page';

const routes: Routes = [
  {
    path: '',
    component: MisveterinariasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisveterinariasPageRoutingModule {}
