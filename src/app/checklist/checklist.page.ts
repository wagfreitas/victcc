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
export class ChecklistPage implements OnInit {
  sistemas: Sistema[] = [];
  projeto!: Projeto;

  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService
  ) { }

  async ngOnInit() {
    try {
      await this.carregarProjeto();
    } catch (error) {

    }
  }

  async carregarProjeto(): Promise<void> {
    try {
      const projetoSelecionado = this.dataService.getProjetoSelecionado();
      console.log(projetoSelecionado)
      if (projetoSelecionado) {
        this.projeto = projetoSelecionado;
        this.sistemas = this.projeto.sistemas || []
      }

    } catch (error) {
      console.log(error);
    }

  }

  atualizarPasso(sistema: Sistema, etapa: Etapa, passo: Passo) {
    // Alternar o estado do passo
    passo.checked = !passo.checked;

    // Recalcular o percentual executado da etapa
    let totalExecutadoEtapa = 0;
    etapa.passos.forEach((p) => {
      if (p.checked) {
        totalExecutadoEtapa += (p.percentualPasso / 100) * etapa.percentualEtapa;
      }
    });
    etapa.executadoEtapa = totalExecutadoEtapa;

    // Recalcular o percentual executado do sistema
    let totalExecutadoSistema = 0;
    sistema.etapas.forEach((et) => {
      if (et.executadoEtapa != undefined) {
        totalExecutadoSistema += et.executadoEtapa;
      }
    });
    sistema.percentualExecutado = totalExecutadoSistema;
    this.atualizarProjeto(false);
    // Logs para depuração
  }


  atualizarProjeto(gravar: boolean = false) {
    let id = this.projeto.id;
    this.projeto.status = 0
    this.sistemas.forEach(sistema => {
      this.projeto.status! += sistema.percentualExecutado
    });

    if (gravar) {
      this.projetoService.updateProjeto(this.projeto.id!, this.projeto);
    } else {
      this.dataService.setProjetoSelecionado(this.projeto);
    }

  }

  voltar() {
    this.atualizarProjeto(true);
    this.router.navigate(["projetos"]);
  }

}
