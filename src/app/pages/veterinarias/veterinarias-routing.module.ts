import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeterinariasPage } from './veterinarias.page';

const routes: Routes = [
  {
    path: '',
    component: VeterinariasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeterinariasPageRoutingModule {}
