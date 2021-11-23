import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfovetPage } from './infovet.page';

const routes: Routes = [
  {
    path: '',
    component: InfovetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfovetPageRoutingModule {}
