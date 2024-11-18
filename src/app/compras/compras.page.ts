import { Component, OnInit } from '@angular/core';
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
  segment: string = 'faltante'; //

  abaselecionada = 'faltante';

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private projetoService: ProjetoService
  ) {
    this.sistemas = this.projeto.sistemas
    console.log(this.sistemas)
  }

  // Filtra os materiais com base no status de 'comprado'
  getMateriais(material: Material, comprado: boolean): any {
    console.log(material)
    //  return processo.materiais.filter(material => material.grau === 0);
  }

  alteraSegment() {
    this.segment
  }

  onCheckMaterial(etapa: Etapa, material: Material) {
    material.comprado = material.comprado === false ? true : false;
    this.updateMaterialGrau(etapa.descricaoEtapa, material.descricaoMaterial, material.comprado);
  }

  updateMaterialGrau(atividade: string, material: string, comprado: boolean) {
    console.log(atividade, material, comprado)
    this.sistemas.forEach(sistema => {
      sistema.etapas.forEach(etapa => {
        etapa.materiais.forEach(mat => {
          if (mat.descricaoMaterial === material) {
            mat.comprado = !comprado;
          }
        });
      });
    });
    const cleanedProjeto = this.projetoService.removeUndefinedFields(this.projeto);
    this.projetoService.updateProjeto(cleanedProjeto.id, cleanedProjeto).then(() => {
      console.log('Projeto atualizado com sucesso!');
    }).catch((error) => {
      console.error('Erro ao atualizar projeto: ', error);
    });


  }

  saveProjetoToFirestore() {

  }

  // Atualiza o status do material para 'comprado'
  comprarMaterial(material: Material) {
    material.comprado = true; // Grau 1 para materiais comprados
  }

  voltar() {
    this.router.navigate(["projetos"]);
  }

  menu(event: any) {
    this.abaselecionada = event.detail.value
  }

}

