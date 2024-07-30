import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
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
    path: 'comunidade',
    loadChildren: () => import('./comunidade/comunidade.module').then( m => m.ComunidadePageModule)
  },
  {
    path: 'calculadora',
    loadChildren: () => import('./calculadora/calculadora.module').then( m => m.CalculadoraPageModule)
  },
  {
    path: 'busca-profissionais',
    loadChildren: () => import('./busca-profissionais/busca-profissionais.module').then( m => m.BuscaProfissionaisPageModule)
  },
  {
    path: 'empresas-1',
    loadChildren: () => import('./empresas-1/empresas-1.module').then( m => m.Empresas1PageModule)
  },
  {
    path: 'concreto',
    loadChildren: () => import('./concreto/concreto.module').then( m => m.ConcretoPageModule)
  },
  {
    path: 'projetos-1',
    loadChildren: () => import('./projetos-1/projetos-1.module').then( m => m.Projetos1PageModule)
  },
  {
    path: 'blocos',
    loadChildren: () => import('./blocos/blocos.module').then( m => m.BlocosPageModule)
  },
  {
    path: 'tinta',
    loadChildren: () => import('./tinta/tinta.module').then( m => m.TintaPageModule)
  },
  {
    path: 'resumo',
    loadChildren: () => import('./resumo/resumo.module').then( m => m.ResumoPageModule)
  },
  {
    path: 'telha',
    loadChildren: () => import('./telha/telha.module').then( m => m.TelhaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
