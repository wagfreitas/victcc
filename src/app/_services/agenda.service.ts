import { Injectable } from '@angular/core';
import  {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Agenda } from '../shared/model/agenda';
import { ServicosManagementService } from './servicos-management.service';


@Injectable({
  providedIn: 'root'
})

export class AgendaService {
 private apiURL = environment.apiURL
 private _agendaData = new BehaviorSubject<Agenda>({} as Agenda);


  constructor(
    private http: HttpClient,
    private _servicoAgenda: ServicosManagementService
    ) { }

    public getAllAgenda(): void{
     this.http.get(`${this.apiURL}/agenda`).subscribe((retorno:any) => {
       this.setAgenda(retorno)
     })
    }

    public createAgenda(arrAgenda: Agenda): Observable<any>{
      return this.http.post(`${this.apiURL}/agenda/create`, arrAgenda)
    }

   private  setAgenda(dados: Agenda): void {
      this._agendaData.next(dados);
    }

    public getAgenda(): Observable<Agenda> {
      return this._agendaData.asObservable();
    }


}
