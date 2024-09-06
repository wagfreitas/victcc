import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../_services/data-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private dataService: DataServiceService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.firestore.collection('projetos').valueChanges().subscribe(res => {
      console.log(res);
      this.dataService.setData(res);
    });
  }
}
