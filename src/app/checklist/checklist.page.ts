import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { ProjetoService } from '../_services/projeto.service';
import { Sistema, Material, Etapa, Passo, Estrutura } from '../_interfaces/estrutura';
import { Projeto } from '../_interfaces/projeto';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage {
  sistemas: Sistema[] = [];
  projeto = this.dataService.getData();
  nomeProjeto: string = '';

  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService) {
    this.sistemas = this.projeto.sistemas
    this.nomeProjeto = this.projeto.sistemas.nomeProjeto
  }


  atualizarPasso(sistema: Sistema, etapa: Etapa, passo: Passo) {
    // Atualizar o estado do passo (executado ou não)
    passo.checked = !passo.checked;
    etapa.executadoEtapa = 0;
    sistema.percentualExecutado = 0;
    console.log(etapa)

    etapa.passos.forEach(p => {
      if (p.checked) {
        etapa.executadoEtapa += (p.percentualPasso / 100) * etapa.percentualEtapa;
      }
    });

    sistema.etapas.forEach(e => {
      console.log(e)
      console.log(e.executadoEtapa)
      if (e.executadoEtapa != undefined) {
        sistema.percentualExecutado += e.executadoEtapa;
      }
    });

    console.log(`Percentual do Sistema ${sistema.descricaoSistema}: ${sistema.percentualExecutado.toFixed(2)}%`);
  }

  voltar() {
    let id = this.projeto.id;
    this.projeto.status = 0
    this.sistemas.forEach(sistema => {
      this.projeto.status += sistema.percentualExecutado
    });
    this.projetoService.updateProjeto(id, this.projeto);
    this.router.navigate(["projetos"]);
  }

}
