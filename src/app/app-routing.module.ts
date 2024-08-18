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
    path: 'home',
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
  },
  {
    path: 'blocos',
    loadChildren: () => import('./blocos/blocos.module').then( m => m.BlocosPageModule)
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'checklist',
    loadChildren: () => import('./checklist/checklist.module').then( m => m.ChecklistPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./compras/compras.module').then( m => m.ComprasPageModule)
  },
  {
    path: 'resumo',
    loadChildren: () => import('./resumo/resumo.module').then( m => m.ResumoPageModule)
  },
  {
    path: 'diario',
    loadChildren: () => import('./diario/diario.module').then( m => m.DiarioPageModule)
  },
  {
    path: 'calculadora',
    loadChildren: () => import('./calculadora/calculadora.module').then( m => m.CalculadoraPageModule)
  },
  {
    path: 'concreto',
    loadChildren: () => import('./concreto/concreto.module').then( m => m.ConcretoPageModule)
  },
  {
    path: 'tinta',
    loadChildren: () => import('./tinta/tinta.module').then( m => m.TintaPageModule)
  },
  {
    path: 'telha',
    loadChildren: () => import('./telha/telha.module').then( m => m.TelhaPageModule)
  },
  {
    path: 'chapisco',
    loadChildren: () => import('./chapisco/chapisco.module').then( m => m.ChapiscoPageModule)
  },
  {
    path: 'gesso',
    loadChildren: () => import('./gesso/gesso.module').then( m => m.GessoPageModule)
  },
  {
    path: 'revestimento',
    loadChildren: () => import('./revestimento/revestimento.module').then( m => m.RevestimentoPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
