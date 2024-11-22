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
  projeto = this.dataService.getData();
  projects$ = this.projetoService.getUserProjects();
  public projetos: Projeto[] = [];


  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService
    )

  {
  this.sistemas = this.projeto.sistemas
  console.log(this.sistemas);
  }

  async ngOnInit() {
    this.projects$.subscribe((projetos: any[]) => {
      this.projetos = projetos.map(projeto => ({
        nomeProjeto: projeto.nomeProjeto,
        id: projeto.id,
        status: projeto.status,
        nomeCliente: projeto.nomeCliente,
        logradouro: projeto.logradouro,
        numero: projeto.numero,
        complemento: projeto.complemento,
        cep: projeto.cep,
        dataInicio: projeto.dataInicio,
        sistemas: projeto.sistemas,
      }));
    });
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

    // Logs para depuração
    console.log(`Passo "${passo.descricaoPasso}" atualizado: ${passo.checked}`);
    console.log(`Etapa "${etapa.descricaoEtapa}" - Percentual Executado: ${etapa.executadoEtapa.toFixed(2)}%`);
    console.log(`Sistema "${sistema.descricaoSistema}" - Percentual Executado: ${sistema.percentualExecutado.toFixed(2)}%`);
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
