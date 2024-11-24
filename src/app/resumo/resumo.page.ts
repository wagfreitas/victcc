<<<<<<< HEAD
import { Component } from '@angular/core';
=======

import { Component, OnInit } from '@angular/core';
>>>>>>> 1f6aed6403f9d88e103c4cbf8e0426a60df3600c
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { ProjetoService } from '../_services/projeto.service';
import { Sistema } from '../_interfaces/estrutura';
import { Projeto } from '../_interfaces/projeto';


@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
})
<<<<<<< HEAD
export class ResumoPage {
  projeto = this.dataService.getData();
=======
export class ResumoPage implements OnInit {
  projeto!: Projeto;
>>>>>>> 1f6aed6403f9d88e103c4cbf8e0426a60df3600c
  progresso: number = 0;
  sistemas: Sistema[] = [];


  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService) {

    this.normalizarPercentuais();
  }

  async ngOnInit() {
    try {
      await this.carregarProjeto();
    } catch (error) {

    }

<<<<<<< HEAD
=======
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


  normalizarPercentuais() {
    const totalPeso = this.sistemas.reduce((acc: number, sistema: { percentualSistema: any; }) => acc + parseFloat(sistema.percentualSistema), 0);
    console.log(totalPeso);
    this.sistemas.forEach((sistema: { percentualSistema: any; }) => {
      sistema.percentualSistema = (parseFloat(sistema.percentualSistema) / totalPeso) * 100;
    });

  }

>>>>>>> 1f6aed6403f9d88e103c4cbf8e0426a60df3600c
  voltar() {
    this.router.navigate(["projetos"]);

  }

}
