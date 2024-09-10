import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';

interface Material {
  descricao: string;
  grau: number;
}

interface Atividade {
  descricao: string;
  material: Material[];
}

interface Processo {
  descricao: string;
  atividade: Atividade[];
}

interface Etapa {
  descricao: string;
  Processo: Processo[];
}

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage {

  projeto = this.dataService.getData();
  projetos: Etapa[] = [];
  segment: string = 'faltante'; //

  abaselecionada = 'faltante';

  constructor(
    private router: Router,
    private dataService: DataServiceService
  ) {
    this.projetos = this.projeto.tipoServico.projeto.etapas
    console.log(this.projetos)
  }

  // Filtra os materiais com base no status de 'comprado'
  getMateriais(processo: Processo, comprado: boolean): any {
    console.log(processo)
    //  return processo.materiais.filter(material => material.grau === 0);
  }

  onCheckMaterial(atividade: any, material: { grau: number; }) {
    material.grau = material.grau === 0 ? 1 : 0;
  }

  // Atualiza o status do material para 'comprado'
  comprarMaterial(material: Material) {
    material.grau = 1; // Grau 1 para materiais comprados
  }



  voltar() {
    this.router.navigate(["projetos"]);
  }

  menu(event: any) {
    this.abaselecionada = event.detail.value
  }

}

