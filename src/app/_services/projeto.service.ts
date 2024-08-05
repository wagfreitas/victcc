import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {


  constructor(
    private db: AngularFirestore
  ) { }

  createProject(data: any){
    return this.db.collection('projetos').add(data);
  }

  public getProjetos(): Observable<any[]> {
    return this.db.collection('projetos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...(data as object) };
      }))
    );
  }
}
