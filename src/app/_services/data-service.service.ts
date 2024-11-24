
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Projeto } from './../_interfaces/projeto';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  projetoSelecionado: Projeto = {} as Projeto;
  constructor() { }

  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.getValue();
  }

  setProjetoSelecionado(projeto: Projeto) {

    this.projetoSelecionado = projeto;
  }

  getProjetoSelecionado(): Projeto {
    return this.projetoSelecionado;
  }
}
