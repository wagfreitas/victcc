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
  projeto = this.dataService.getData();
  sistemas: Sistema[] = [];
  abaselecionada = 'tudo';
  projects$ = this.projetoService.getUserProjects();
  public projetos: Projeto[] = [];

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private projetoService: ProjetoService
  )

  {
    this.sistemas = this.projeto.sistemas || [];
    console.log(this.sistemas);
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
