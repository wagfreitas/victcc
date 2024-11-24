import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../_services/data-service.service';
import { ProjetoService } from '../_services/projeto.service';
import { Sistema, Material, Etapa } from '../_interfaces/estrutura';
import { Projeto } from '../_interfaces/projeto';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  projeto!: Projeto;
  sistemas: Sistema[] = [];
  abaselecionada = 'tudo';

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private projetoService: ProjetoService
  ) { }

  async ngOnInit() {
    try {
      await this.carregarProjeto();
    } catch (error) {
      console.log(error);
    }
  }

  async carregarProjeto(): Promise<void> {
    try {
      const projetoSelecionado = this.dataService.getProjetoSelecionado();
      if (projetoSelecionado) {
        this.projeto = projetoSelecionado;
        this.sistemas = this.projeto.sistemas || [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Filtra os materiais com base no filtro selecionado
  getMateriais(materials: Material[], filtro: string): Material[] {
    return filtro === 'tudo'
      ? materials
      : materials.filter(material =>
        filtro === 'comprado' ? material.comprado : !material.comprado
      );
  }

  // Altera o filtro atual
  menu(event: any) {
    this.abaselecionada = event.detail.value;
  }

  // Atualiza o status do material
  onCheckMaterial(etapa: Etapa, material: Material) {
    material.comprado = !material.comprado;
    this.updateMaterialGrau(etapa.descricaoEtapa, material.descricaoMaterial, material.comprado);
  }

  // Atualiza o material no projeto e salva no Firestore
  updateMaterialGrau(atividade: string, material: string, comprado: boolean) {
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
      .then(() => console.log('Projeto atualizado com sucesso!'))
      .catch(error => console.error('Erro ao atualizar projeto:', error));
  }

  voltar() {
    this.router.navigate(['projetos']);
  }
}
