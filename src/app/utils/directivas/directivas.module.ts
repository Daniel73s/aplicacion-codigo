import { NgModule } from '@angular/core';
import { ImagenDirective } from './imagen.directive';




@NgModule({
  declarations: [ImagenDirective],
  exports:[ImagenDirective]
})
export class MisdirectivasModule { }