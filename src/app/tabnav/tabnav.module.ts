import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabnavPageRoutingModule } from './tabnav-routing.module';

import { TabnavPage } from './tabnav.page';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabnav',
    component: TabnavPage,
    children: [
      {
        path: 'calendario',
        loadChildren: () =>
          import('../my-calendar/my-calendar.module').then(
            (m) => m.MyCalendarPageModule
          ),
      },
      {
        path: 'projetos',
        loadChildren: () =>
          import('../projetos-1/projetos-1.module').then(
            (m) => m.Projetos1PageModule
          ),
      },
      {
        path: 'eventos',
        loadChildren: () => import('../add-event/add-event.module').then(m => m.AddEventPageModule)
      },

    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabnav/projetos',
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabnavPageRoutingModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TabnavPage]
})
export class TabnavPageModule {}
