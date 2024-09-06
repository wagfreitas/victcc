import { Category } from '../_interfaces/etapa';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';
import { identifierName } from '@angular/compiler';
import { Projeto } from '../_interfaces/projeto';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.page.html',
  styleUrls: ['./projetos.page.scss'],
})
export class ProjetosPage {
  public projetos: Projeto[] = [];
  constructor(
    private router: Router,
    private projetoService: ProjetoService
  ) {
    this.projetoService.getProjetos().subscribe((res: any[]) => {
      res.forEach(element => {
        let resul = {
          nomeProjeto: element.nomeProjeto,
          id: element.id,
          status: element.status,
          nomeCliente: element.nomeCliente,
          logradouro: element.logradouro,
          numero: element.numero,
          complemento: element.complemento,
          cep: element.cep,
          dataInicio: element.dataInicio,
          dataFim: element.dataFim,
          tipoServico: element.tipoServico,
          Category: element.Category,
        }
        this.projetos.push(resul)
      });

    })
  }


  voltar() {
    this.router.navigate(["inicial"]);
  }

  abrir(id: Projeto) {
    this.projetoService.setIdProject(id);
    this.router.navigate(["tabs/resumo"]);

  }


}
