import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createProject(data: any){
    return this.firestore.collection('projetos').add(data);
  }
}
