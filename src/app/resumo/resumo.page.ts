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
  nomeProjeto: string = '';
  constructor(
    private router: Router,
    private dataService: DataServiceService) {
    this.progresso = this.projeto.status;
    this.nomeProjeto = this.projeto.nomeProjeto;
    this.normalizarPercentuais();

  }

  voltar() {
    this.router.navigate(["projetos"]);

  }

  normalizarPercentuais() {
    const totalPeso = this.projeto.sistemas.reduce((acc: number, sistema: { percentualSistema: any; }) => acc + parseFloat(sistema.percentualSistema), 0);
    console.log(totalPeso);
    this.projeto.sistemas.forEach((sistema: { percentualSistema: any; }) => {
      sistema.percentualSistema = (parseFloat(sistema.percentualSistema) / totalPeso) * 100;
    });

  }

}
