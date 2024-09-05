import { Component, model, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';
import { ModalController } from '@ionic/angular';
import { ModalProjetoComponent } from '../modal-projeto/modal-projeto.component';
import { Etapa } from '../_interfaces/projeto';
import { Projeto } from '../_interfaces/projeto';
import { UtilService } from '../_services/util.service';



@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.page.html',
  styleUrls: ['./novo-projeto.page.scss'],
})
export class NovoProjetoPage implements OnInit {
  modelData: any;
  dadosProjeto: Projeto[] = [];
  novoProjeto: string = 'Novo Projeto'

  categories: Etapa[] = []



  nomeProjeto: string = "";


  constructor(
    private router: Router,
    private projService: ProjetoService,
    private modalController: ModalController,
    private utilService: UtilService) {
    this.getSelectedItems();
  }

  ngOnInit(): void {
    this.openModal()

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

  getSelectedItems() {
    const selectedItems = this.categories?.map(category => ({
      category: category.name,
      items: category.items,
    }));
    console.log(selectedItems);
  }

  onItemChange(item: any) {

  }

  voltar() {
    this.router.navigate(["inicial"]);
  }

  toggleInputs(opcao: any, event: any) {
    console.log(event.detail.checked);
    console.log(opcao);
  }

  generateJson() {
    let result = this.categories.map(category => {
      let items = category.items.filter(item => item.selected).map(item => {
        let values: { [key: string]: any } = {}; // Adicione a assinatura do índice aqui
        for (let key in item.values[0]) {
          if (item.values[0][key]) {
            values[key] = item.values[0][key];
          }
        }
        return { name: item.name, values: values };
      });
      return { name: category.name, items: items };
    });
    return result;
  }


  saveToFirestore() {
    let data = { etapas: this.generateJson() };
    let dadosProjeto = {
      nomeProjeto: this.dadosProjeto[0].nomeProjeto,
      nomeCliente: this.dadosProjeto[0].nomeCliente,
      logradouro: this.dadosProjeto[0].logradouro,
      numero: this.dadosProjeto[0].numero,
      complemento: this.dadosProjeto[0].complemento,
      cep: this.dadosProjeto[0].cep,
      dataInicio: this.dadosProjeto[0].dataInicio,
      dataFim: this.dadosProjeto[0].dataFim,
      status: this.dadosProjeto[0].status,
      data
    }

    this.projService.createProject(dadosProjeto).then(() => {
      this.utilService.success_msg("Projeto criado com sucesso!");
      this.router.navigate(["projetos"]);
    }).catch((error) => {
      console.error("Erro ao criar projeto: ", error);
    });
  }

}
