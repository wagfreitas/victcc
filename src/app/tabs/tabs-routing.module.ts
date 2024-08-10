import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'checklist',
        loadChildren: () => import('../checklist/checklist.module').then(m => m.ChecklistPageModule)
      },
      {
        path: 'compras',
        loadChildren: () => import('../compras/compras.module').then(m => m.ComprasPageModule)
      },
      {
        path: 'resumo',
        loadChildren: () => import('../resumo/resumo.module').then(m => m.ResumoPageModule)
      },
      {
        path: 'diario',
        loadChildren: () => import('../diario/diario.module').then(m => m.DiarioPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/resumo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/resumo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
