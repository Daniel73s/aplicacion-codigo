import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utils/guards/auth.guard';
// import { AuthGuard } from 'src/app/utils/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
        
      },
      {
        path: 'veterinarias',
        loadChildren: () => import('../veterinarias/veterinarias.module').then(m => m.VeterinariasPageModule)
      },
      {
        path: 'infovet/:codvet',
        loadChildren: () => import('../infovet/infovet.module').then(m => m.InfovetPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path:'crearcuenta',
        loadChildren:()=>import('../crearcuenta/crearcuenta.module').then(m=>m.CrearcuentaPageModule)
      },
      {
        path:'anuncio/:codanuncio',
        loadChildren:()=>import('../anuncio/anuncio.module').then(m=>m.AnuncioPageModule),
        
      },
      {
        path:'misveterinarias/:codper',
        loadChildren:()=>import('../misveterinarias/misveterinarias.module').then(m=>m.MisveterinariasPageModule),
        canActivate:[AuthGuard],data:{expectedRole:2}
      },
      {
        path:'misanuncios/:codvet',
        loadChildren:()=>import('../misanuncios/misanuncios.module').then(m=>m.MisanunciosPageModule),
        canActivate:[AuthGuard]
      },
      {
        path:'addanuncio/:codvet',
        loadChildren:()=>import('../addanuncio/addanuncio.module').then(m=>m.AddanuncioPageModule),
        canActivate:[AuthGuard]
      },
      {
        path:'modanuncio/:codanuncio',
        loadChildren:()=>import('../modanuncio/modanuncio.module').then(m=>m.ModanuncioPageModule),
        canActivate:[AuthGuard]
      },
      {
        path:'modveterinaria/:codvet',
        loadChildren:()=>import('../modveterinaria/modveterinaria.module').then(m=>m.ModveterinariaPageModule),
        canActivate:[AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
