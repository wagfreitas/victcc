import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Agenda } from '../_interfaces/agenda';


@Injectable({
  providedIn: 'root'
})
export class ServicosManagementService {

  public readonly agenda$ = new BehaviorSubject<Agenda>({} as Agenda);

  constructor() { }
}
