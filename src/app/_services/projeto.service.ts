import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Projeto } from '../_interfaces/projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private projetos: BehaviorSubject<Projeto[]> = new BehaviorSubject<Projeto[]>([]);
  private projeto: BehaviorSubject<Projeto> = new BehaviorSubject<Projeto>({} as Projeto);
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

  public getProjetoById(id: string): Observable<any> {
    return this.db.collection('projetos').doc(id).valueChanges();
  }

  public updateProjeto(id: string, data: any){
    return this.db.collection('projetos').doc(id).update(data);
  }

  public deleteProjeto(id: string){
    return this.db.collection('projetos').doc(id).delete();
  }

  public setIdProject(valor: Projeto){
    console.log(valor);
    this.projeto.next(valor);
  }

  public getIdProject(): Observable<Projeto>{
    return this.projeto.asObservable();
  }
}
