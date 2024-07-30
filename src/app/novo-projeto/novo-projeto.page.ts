import { Component, model, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';

interface Item {
  opcao: string;
  values: Medidas[];
  selected: false;
  [key: string]: any;
}

interface Category {
  name: string;
  items: Item[];
}

interface Medidas{
  Quantidade?: number;
  Volume?: number;
  Área?: number;
  dimensaoA?: number;
  dimensaoB?: number;
  Altura?: number;
  [key: string]: any;
}

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.page.html',
  styleUrls: ['./novo-projeto.page.scss'],
})
export class NovoProjetoPage {
  modelData: any;

  categories: Category[] = [

    {
      name: 'Preparacão do terreno',
      items: [
        { opcao: 'Remocao da Vegetacao', values: [{ 'Quantidade': 0}], selected: false },
        { opcao: 'Nivelamento', values: [{ 'Volume': 0}], selected: false },
      ],
    },
    {
      name: 'Fundacão',
      items: [
        { opcao: 'Bloco de Concreto', values: [{ 'Volume': 0, 'Quantidade': 0}], selected: false },
        { opcao: 'Radier', values: [{ 'Área': 0, 'Altura': 0}], selected: false },
      ],
    },
    {
      name: 'Estruturas',
      items: [
        {
          opcao: 'Pilar',
         values: [{ dimensaoA: 0, dimensaoB: 0, altura: 0, quantity: 0}], selected: false
        },
        {
          opcao: 'Viga',
          values: [{ dimensaoA: 0, dimensaoB: 0, altura: 0, quantity: 0}], selected: false
        },
      ],
    },

    {
      name: 'Estruturas',
      items: [
        {
         opcao: 'Pilar',
         values: [{ dimensaoA: 0, dimensaoB: 0, altura: 0, quantity: 0}], selected: false
        },
        {
          opcao: 'Viga',
          values: [{ dimensaoA: 0, dimensaoB: 0, altura: 0, quantity: 0}], selected: false
        },
      ],
    },
  ];



  nome = ""

  remocaoSelecionada: boolean = false;
  nivelSelecionado: boolean = false;
  marcacaoSelecionada: boolean = false;
  blocoSelecionado: boolean = false;
  radierSelecionado: boolean = false;
  sapataSelecionada: boolean = false;
  estConcretoSelecionada: boolean = false;
  estMetalicaSelecionada: boolean = false;


  quantidadeRemocao = 0;
  volumeNivel = 0;
  areaMarcacao = 0;

  volumeBloco = 0;
  quantidadeBloco = 0;

  areaRadier = 0;
  alturaRadier = 0;

  tipoSapata = "Isolada";
  volumeSapata = 0;
  quantidadeSapata = 0;

  compPilar = 0;
  largPilar = 0;
  altPilar = 0;
  quantPilar = 0;

  compViga = 0;
  largViga = 0;
  altViga = 0;
  quantViga = 0;

  areaLaje = 0;
  espLaje = 0;

  diasMetalica = 0;

  constructor(
    private router: Router,
    private projService: ProjetoService) {
    this.getSelectedItems();
  }


  objectKeys(item: any) {
    return Object.keys(item.values[0]);
  }

  testar() {
    console.log("Cliquei no botão");
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
        return { name: item.opcao, values: values };
      });
      return { name: category.name, items: items };
    });
    return result;
  }


  saveToFirestore() {
    let data = {projeto: this.generateJson()};
    this.projService.createProject(data).then(() => {
      console.log("Projeto criado com sucesso");
    }).catch((error: any) => {
      console.error("Erro ao criar projeto: ", error);
    });
  }

}
