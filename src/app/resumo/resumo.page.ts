import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { ProjetoService } from '../_services/projeto.service';
import { Sistema, Material, Etapa, Passo, Estrutura } from '../_interfaces/estrutura';
import { Projeto } from '../_interfaces/projeto';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
})
export class ResumoPage implements OnInit{
  projeto = this.dataService.getData();
  progresso: number = 0;
  sistemas: Sistema[] = [];
  projects$ = this.projetoService.getUserProjects();
  public projetos: Projeto[] = [];

  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService)

    {
    this.progresso = this.projeto.status;
    this.normalizarPercentuais();
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
