import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
})
export class ResumoPage {
  projeto = this.dataService.getData();
  progresso: number = 0;
  constructor(
    private router: Router,
    private dataService: DataServiceService) {
    this.progresso = this.projeto.status;
    console.log(this.projeto.status);
  }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["projetos"]);

  }

}
