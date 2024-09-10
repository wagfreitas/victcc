import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';
import { DataServiceService } from '../_services/data-service.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage {
  nomeUser: string = '';
  userId: string = '';

  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService
  ) {
    this.projetoService.getUserLogged().then((res) => {
      if (res) {
        this.nomeUser = res.displayName ?? '';
      }
    });

  }

  novoprojeto() {
    this.router.navigate(["/novo-projeto"]);
  }


  projetos() {
    this.router.navigate(["/projetos"]);
  }

  comunidade() {
    this.router.navigate(["/comunidade"]);
  }

  calculadora() {
    this.router.navigate(["/calculadora"]);
  }
}
