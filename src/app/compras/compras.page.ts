import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { ProjetoService } from '../_services/projeto.service';

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
  etapas: Etapa[] = [];
  segment: string = 'faltante'; //

  abaselecionada = 'faltante';

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private projetoService: ProjetoService
  ) {
    console.log(this.projeto)
    this.etapas = this.projeto.tipoServico.projeto.etapas

  }

  // Filtra os materiais com base no status de 'comprado'
  getMateriais(processo: Processo, comprado: boolean): any {
    console.log(processo)
    //  return processo.materiais.filter(material => material.grau === 0);
  }

  alteraSegment() {
    this.segment
  }

  onCheckMaterial(atividade: any, material: any) {
    material.grau = material.grau === 0 ? 1 : 0;
    this.updateMaterialGrau(atividade.descricao, material.descricao, material.grau);
  }

  updateMaterialGrau(atividade: string, material: string, grau: number) {
    console.log(atividade, material)
    this.etapas.forEach(etapa => {
      etapa.Processo.forEach(processo => {
        processo.atividade.forEach(ativ => {
          if (ativ.descricao === atividade) {
            ativ.material.forEach(mater => {
              if (mater.descricao === material) {
                mater.grau = grau;
              }
            });
          }
        });
      });
    });

  }

  saveProjetoToFirestore() {
    const cleanedProjeto = this.projetoService.removeUndefinedFields(this.projeto);
    this.projetoService.updateProjeto(cleanedProjeto.id, cleanedProjeto).then(() => {
      console.log('Projeto atualizado com sucesso!');
    }).catch((error) => {
      console.error('Erro ao atualizar projeto: ', error);
    });
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

