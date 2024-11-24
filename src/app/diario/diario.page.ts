import { Component, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { ProjetoService } from '../_services/projeto.service';
import { Sistema, Material, Etapa, Passo, Estrutura } from '../_interfaces/estrutura';
import { Projeto } from '../_interfaces/projeto';


@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})
export class DiarioPage {
  sistemas: Sistema[] = [];
  projeto = this.dataService.getData();
  projects$ = this.projetoService.getUserProjects();
  public projetos: Projeto[] = [];

  constructor(
    private router: Router,
    private projetoService: ProjetoService,
    private dataService: DataServiceService)
    {
    this.sistemas = this.projeto.sistemas
    console.log(this.sistemas);
    }

  voltar() {
    this.router.navigate(["projetos"]);
  }
}
