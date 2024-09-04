import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../_interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private db: AngularFirestore
  ) { }

  public getCategories(): Observable<any[]> {
    return this.db.collection('categorias').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...(data as object) };
      }))
    );
  }

  public getCategoryById(id: string): Observable<any> {
    return this.db.collection('categorias').doc(id).valueChanges();
  }

  public updateCategory(id: string, data: any) {
    return this.db.collection('categorias').doc(id).update(data);
  }

  public deleteCategory(id: string) {
    return this.db.collection('categorias').doc(id).delete();
  }

  public createCategory(data: any) {
    return this.db.collection('categorias').add(data);
  }


}
