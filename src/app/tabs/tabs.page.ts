import { Component } from '@angular/core';
import { DataServiceService } from '../_services/data-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProjetoService } from '../_services/projeto.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  projetos: any = []
  constructor(
    private dataService: DataServiceService,
    private firestore: AngularFirestore,
    private projetoService: ProjetoService
  ) { }



}
