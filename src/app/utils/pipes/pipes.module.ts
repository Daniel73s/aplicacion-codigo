import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { AnunciofiltroPipe } from './anunciofiltro.pipe';



@NgModule({
  declarations: [FiltroPipe, AnunciofiltroPipe],
  exports:[FiltroPipe,AnunciofiltroPipe]
})
export class PipesModule { }