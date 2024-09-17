import { Category } from './../_interfaces/category';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';
import { DataServiceService } from '../_services/data-service.service';
import { Projeto } from '../_interfaces/projeto';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.page.html',
  styleUrls: ['./projetos.page.scss'],
})
export class ProjetosPage implements OnInit {
  projects$ = this.projetoService.getUserProjects();
  public projetos: Projeto[] = [];
  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService
  ) { }


  async ngOnInit() {
    this.projects$.subscribe((projetos: any[]) => {
      projetos.forEach(projeto => {
        let resul = {
          nomeProjeto: projeto.nomeProjeto,
          id: projeto.id,
          status: projeto.status,
          nomeCliente: projeto.nomeCliente,
          logradouro: projeto.logradouro,
          numero: projeto.numero,
          complemento: projeto.complemento,
          cep: projeto.cep,
          dataInicio: projeto.dataInicio,
          dataFim: projeto.dataFim,
          tipoServico: projeto.tipoServico,

          Category: projeto.Category,
        }
        this.projetos.push(resul)
      })
    })
  }

  voltar() {
    this.router.navigate(["inicial"]);
  }

  abrir(proj: Projeto) {
    console.log(proj)
    this.dataService.setData(proj);
    this.router.navigate(["tabs/resumo"]);

  }


}
