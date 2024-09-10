import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, of, switchMap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Projeto } from '../_interfaces/projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private projetos: BehaviorSubject<Projeto[]> = new BehaviorSubject<Projeto[]>([]);
  private projeto: BehaviorSubject<Projeto> = new BehaviorSubject<Projeto>({} as Projeto);
  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }


  createProject(data: any) {
    return this.db.collection('projetos').add(data);
  }

  getUserProjects() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.db.collection('projetos', ref => ref.where('userId', '==', userId)).valueChanges();
        } else {
          return of([]); // Retorna um array vazio se o usuário não estiver logado
        }
      })
    );
  }



  async getUserLogged() {
    const user = await this.afAuth.currentUser;
    if (user) {
      console.log(user.displayName)
      return user
    } else {
      return null
    }
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

  public updateProjeto(id: string, data: any) {
    return this.db.collection('projetos').doc(id).update(data);
  }

  public deleteProjeto(id: string) {
    return this.db.collection('projetos').doc(id).delete();
  }

  public setIdProject(valor: Projeto) {
    this.projeto.next(valor);
  }

  public getIdProject(): Observable<Projeto> {
    return this.projeto.asObservable();
  }
}
