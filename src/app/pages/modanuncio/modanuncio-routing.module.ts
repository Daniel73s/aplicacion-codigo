import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModanuncioPage } from './modanuncio.page';

const routes: Routes = [
  {
    path: '',
    component: ModanuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModanuncioPageRoutingModule {}
