import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';
import { ModalController } from '@ionic/angular';
import { ModalProjetoComponent } from '../modal-projeto/modal-projeto.component';
import { Projeto } from '../_interfaces/projeto';
import { CategoriesService } from '../_services/categories.service';
import { EtapasService } from '../_services/etapas.service';
import { UtilService } from '../_services/util.service';
import { Estrutura, Etapa, Material, Medida, Passo, Sistema } from '../_interfaces/estrutura';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.page.html',
  styleUrls: ['./novo-projeto.page.scss'],
})
export class NovoProjetoPage implements OnInit {

  modelData: any;
  coeficienteInput: boolean = false;
  duracaoInput: boolean = false;
  dadosProjeto: Projeto[] = [];
  novoProjeto: string = 'Novo Projeto'
  estruturas: Estrutura[] = [];
  sistemas: Sistema[] = [];
  etapas: Etapa[] = [];
  materiais: Material[] = [];
  medidas: Medida[] = [];
  passos: Passo[] = [];

  nomeProjeto = ""

  constructor(
    private router: Router,
    private projService: ProjetoService,
    private modalController: ModalController,
    private utilService: UtilService,
    private etapasService: EtapasService,
    private categorieService: CategoriesService) {
    // this.getSelectedItems();
  }

  ngOnInit(): void {

    this.categorieService.getCategories().subscribe((data) => {
      data.forEach((doc) => {
        const estrutura = {
          descricaoSistema: doc.sistemas[0].descricaoSistema,
          percentualSistema: doc.sistemas[0].percentualSistema,
          ordemSistema: doc.sistemas[0].ordemSistema,
          etapas: doc.sistemas[0].etapas,
        }
        this.sistemas.push(estrutura);

      });

    })

    this.openModal()

    this.sistemas.sort((a, b) => a.ordemSistema - b.ordemSistema);

    console.log(this.sistemas)
  }

  getMedidaLabel(medida: any): string {
    return `${medida.descricao}`;
  }

  toggleProcess(etapa: any) {
    etapa.expanded = !etapa.expanded;
  }

  toggleAtividade(atividade: any) {
    atividade.expanded = !atividade.expanded;
  }

  gravarDadosFiltrados() {
    const dadosParaGravar = this.sistemas.map(sistema => {
      return {
        descricaoSistema: sistema.descricaoSistema,
        ordemSistema: sistema.ordemSistema,
        etapas: sistema.etapas.map(etapa => {
          return {
            descricaoEtapa: etapa.descricaoEtapa,
            coeficiente: etapa.coeficiente,
            duracao: etapa.duracao,
            ordem: etapa.ordemEtapa,
            materiais: etapa.materiais.map(material => ({
              descricaoMaterial: material.descricaoMaterial,
              comprado: material.comprado,
              coeficiente: material.coeficiente,
            })),
            passos: etapa.passos.map(passo => ({
              descricaoPasso: passo.descricaoPasso,
              ordemPasso: passo.ordemPasso,
              percentual: passo.percentual || '0'
            })),
            medidas: etapa.medidas.filter(medida => parseInt(medida.valor) > 0)
          };
        }).filter(etapa => etapa.medidas.length > 0)
      };
    }).filter(sistema => sistema.etapas.length > 0);

    const cleanedProjeto = this.projService.removeUndefinedFields(dadosParaGravar);
    // Salvando no Firestore
    this.saveToFirestore(cleanedProjeto);
  }

  objectKeys(item: any) {
    return Object.keys(item.values[0]);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalProjetoComponent,
      componentProps: {
        // Propriedades que você deseja passar para o modal
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.dadosProjeto.push(dataReturned.data);

        this.nomeProjeto = this.dadosProjeto[0].nomeProjeto || "";

      }
    });


    return await modal.present();
  }

  saveToFirestore(result: any) {
    let data = { projeto: result };
    console.log(data)
    let dadosProjeto = {
      nomeProjeto: this.dadosProjeto[0].nomeProjeto,
      nomeCliente: this.dadosProjeto[0].nomeCliente,
      logradouro: this.dadosProjeto[0].logradouro,
      numero: this.dadosProjeto[0].numero,
      complemento: this.dadosProjeto[0].complemento,
      cep: this.dadosProjeto[0].cep,
      dataInicio: this.dadosProjeto[0].dataInicio,
      dataFim: this.dadosProjeto[0].dataFim,
      userId: this.dadosProjeto[0].userId,
      status: this.dadosProjeto[0].status,
      sistemas: data.projeto
    }

    console.log(dadosProjeto)

    this.projService.createProject(dadosProjeto).then((docRef) => {
      const projId = docRef.id;
      this.atualizaProjeto(projId, docRef);

    }).catch((error) => {
      console.error("Erro ao criar projeto: ", error);
    });
  }

  atualizaProjeto(projId: string, docRef: any) {
    docRef.update({ id: projId }).then(() => {
      this.utilService.success_msg("Projeto criado com sucesso!");
      this.router.navigate(["projetos"]);
    }).catch((error: any) => {
      console.error("Erro ao atualizar projeto: ", error);
    });
  }

<<<<<<< HEAD
=======
  voltar() {
    this.router.navigate(["inicial"]);
  }


>>>>>>> 1a5cb74c60440e8dfd493e7c5b66daca7421bf5a
}
