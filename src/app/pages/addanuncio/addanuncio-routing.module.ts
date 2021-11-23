import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddanuncioPage } from './addanuncio.page';

const routes: Routes = [
  {
    path: '',
    component: AddanuncioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddanuncioPageRoutingModule {}
