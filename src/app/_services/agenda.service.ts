import { Injectable } from '@angular/core';
import  {BehaviorSubject, Observable, map} from 'rxjs';
import { Agenda } from '../shared/model/agenda';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class AgendaService {

 private _agendaData = new BehaviorSubject<Agenda>({} as Agenda);


  constructor(
    private db: AngularFirestore
    ) { }



     public getAgenda(): Observable<any[]> {
        return this.db.collection('agenda').snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...(data as object) };
          }))
        );
      }



    public createAgenda(arrAgenda: Agenda): Promise<any> {
      return this.db.collection('agenda').add(arrAgenda);
    }




}
