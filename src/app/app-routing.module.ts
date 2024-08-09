import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'entrar',
    loadChildren: () => import('./entrar/entrar.module').then( m => m.EntrarPageModule)
  },
  {
    path: 'inicial',
    loadChildren: () => import('./inicial/inicial.module').then( m => m.InicialPageModule)
  },
  {
    path: 'novo-projeto',
    loadChildren: () => import('./novo-projeto/novo-projeto.module').then( m => m.NovoProjetoPageModule)
  },
  {
    path: 'projetos',
    loadChildren: () => import('./projetos/projetos.module').then( m => m.ProjetosPageModule)
  },  {
    path: 'blocos',
    loadChildren: () => import('./blocos/blocos.module').then( m => m.BlocosPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
