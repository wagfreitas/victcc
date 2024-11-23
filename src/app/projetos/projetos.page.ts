import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProjetoService } from '../_services/projeto.service';
import { DataServiceService } from '../_services/data-service.service';
import { Projeto } from '../_interfaces/projeto';
import { Sistema } from '../_interfaces/estrutura';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.page.html',
  styleUrls: ['./projetos.page.scss'],
})
export class ProjetosPage implements OnInit {
  projeto!: Projeto;
  projetos: Projeto[] = [];
  sistemas: Sistema[] = [];

  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService
  ) { }


  async ngOnInit() {
    try {
      await this.carregarProjetos();
      console.log(this.projetos);
    } catch (error) {
      console.log(error);
    }
  }

  async carregarProjetos(): Promise<void> {
    try {
      const projetosResponse = await firstValueFrom(this.projetoService.getUserByProjects());
      this.projetos = projetosResponse.map(projeto => ({
        ...projeto,
        sistemas: projeto.sistemas
      }));

    } catch (error) {
      console.log(error);
    }
  }

  abrir(proj: Projeto) {
    console.log(proj)
    this.dataService.setProjetoSelecionado(proj);
    this.router.navigate(["tabs/resumo"]);

  }

  voltar() {
    this.router.navigate(["inicial"]);
  }

}
