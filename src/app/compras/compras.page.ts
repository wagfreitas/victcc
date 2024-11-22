import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { ProjetoService } from '../_services/projeto.service';
import { Sistema, Material, Etapa } from '../_interfaces/estrutura';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage {
  projeto = this.dataService.getData();
  sistemas: Sistema[] = [];
  abaselecionada = 'tudo'; // Valor inicial do filtro ('faltante', 'comprado' ou 'tudo')

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private projetoService: ProjetoService
  ) {
    this.sistemas = this.projeto.sistemas || [];
    console.log(this.sistemas);
  }

  // Filtra os materiais com base no filtro selecionado
  getMateriais(materials: Material[], filtro: string): Material[] {
    if (filtro === 'tudo') {
      return materials; // Retorna todos os materiais
    }
    return materials.filter(material =>
      filtro === 'comprado' ? material.comprado : !material.comprado
    );
  }

  // Altera o filtro atual
  menu(event: any) {
    this.abaselecionada = event.detail.value; // Atualiza o filtro selecionado
  }

  // Atualiza o status do material
  onCheckMaterial(etapa: Etapa, material: Material) {
    material.comprado = !material.comprado; // Alterna o status
    this.updateMaterialGrau(etapa.descricaoEtapa, material.descricaoMaterial, material.comprado);
  }

  // Atualiza o material no projeto e salva no Firestore
  updateMaterialGrau(atividade: string, material: string, comprado: boolean) {
    console.log(atividade, material, comprado);
    this.sistemas.forEach(sistema => {
      sistema.etapas.forEach(etapa => {
        etapa.materiais.forEach(mat => {
          if (mat.descricaoMaterial === material) {
            mat.comprado = comprado;
          }
        });
      });
    });
    const cleanedProjeto = this.projetoService.removeUndefinedFields(this.projeto);
    this.projetoService.updateProjeto(cleanedProjeto.id, cleanedProjeto)
      .then(() => {
        console.log('Projeto atualizado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao atualizar projeto: ', error);
      });
  }

  voltar() {
    this.router.navigate(['projetos']);
  }
}
