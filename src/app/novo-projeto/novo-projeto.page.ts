import { map } from 'rxjs';
import { Component, model, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetoService } from '../_services/projeto.service';
import { ModalController } from '@ionic/angular';
import { ModalProjetoComponent } from '../modal-projeto/modal-projeto.component';
import { Category } from '../_interfaces/category';
import { Projeto } from '../_interfaces/projeto';
import { EtapasService } from '../_services/etapas.service';
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

  categories: Category[] = [

    {
      name: 'Preparacão do terreno',
      items: [
        { name: 'Remocao da Vegetacao', values: [{ 'Quantidade': 0 }], selected: false },
        { name: 'Nivelamento', values: [{ 'Volume': 0 }], selected: false },
      ],
    },
    {
      name: 'Fundacão',
      items: [
        { name: 'Bloco de Concreto', values: [{ 'Volume': 0, 'Quantidade': 0 }], selected: false },
        { name: 'Radier', values: [{ 'Área': 0, 'Altura': 0 }], selected: false },
      ],
    },
    {
      name: 'Estruturas',
      items: [
        {
          name: 'Pilar',
          values: [{ dimensaoA: 0, dimensaoB: 0, altura: 0, quantity: 0 }], selected: false
        },
        {
          name: 'Viga',
          values: [{ dimensaoA: 0, dimensaoB: 0, altura: 0, quantity: 0 }], selected: false
        },
      ],
    },
  ];

  etapas: any[] = [
    {
      "descricao": "Preparação",
      "Processo": [
        {
          "atividade": [
            {
              "duracao": 1,
              "ordem": 1,
              "descricao": "Remoção de árvore",
              "medidas": [
                {
                  "Quantidade": "0"
                }
              ],
              "material": [
                {
                  "descricao": "Motoserra",
                  "grau": 0
                },
                {
                  "grau": 0,
                  "descricao": "Cordas"
                },
                {
                  "grau": 0,
                  "descricao": "Guincho"
                }
              ],
              "regra": "A"
            },
            {
              "medida": [
                {
                  "Quantidade": "0"
                }
              ],
              "descricao": "Remoção de Grama",
              "material": [
                {
                  "descricao": "Enxadas",
                  "grau": 0
                },
                {
                  "descricao": "Pás",
                  "grau": 0
                },
                {
                  "grau": 0,
                  "descricao": "Carrinho de Mão"
                },
                {
                  "descricao": "Cortador de grama",
                  "grau": 0
                }
              ],
              "ordem": 1,
              "duracao": 1,
              "regra": "B"
            }
          ],
          "descricao": "Demolição"
        },
        {
          "atividade": [
            {
              "duracao": "3",
              "ordem": "2",
              "descricao": "Escavação",
              "regra": "E",
              "medida": [
                {
                  "Volume": "0"
                }
              ]
            },
            {
              "ordem": 2,
              "duracao": 3,
              "descricao": "Aterro",
              "medida": [
                {
                  "Volume": 0
                }
              ]
            },
            {
              "descricao": "Empresa tercerizada",
              "regra": "C",
              "ordem": 2,
              "duracao": 1
            }
          ],
          "descricao": "Nivelamento"
        }
      ]
    },
    {
      "Processo": [
        {
          "descricao": "Radier",
          "atividade": [
            {
              "regra": "G",
              "ordem": 3,
              "duracao": 3
            }
          ]
        },
        {
          "descricao": "Sapata",
          "atividade": [
            {
              "duracao": 4,
              "regra": "H",
              "ordem": 4,
              "descricao": "Sapata"
            }
          ]
        },
        {
          "descricao": "Estacas",
          "atividade": [
            {
              "duracao": 4,
              "descricao": "Estacas",
              "regra": "H",
              "ordem": 3
            }
          ]
        }
      ],
      "descricao": "Fundação"
    }
  ];




  nomeProjeto = ""

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
    private projService: ProjetoService,
    private modalController: ModalController,
    private utilService: UtilService,
    private etapasService: EtapasService) {
    this.getSelectedItems();
  }

  ngOnInit(): void {
    this.etapasService.getEtapas().subscribe((data) => {
      this.modelData = data;
      console.log(this.modelData);

      this.modelData.forEach((element: any) => {
        console.log(element);
        element.etapa.forEach((etapa: any) => {
          console.log(etapa)
        });

      }

      );
    });
    this.openModal()



  }

  getMedidaLabel(medida: any): string {
    return Object.keys(medida)[0];
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
    let data = { projeto: this.generateJson() };
    let dadosProjeto = {
      nomeProjeto: this.dadosProjeto[0].nomeProjeto,
      nomeCliente: this.dadosProjeto[0].nomeCliente,
      logradouro: this.dadosProjeto[0].logradouro,
      numero: this.dadosProjeto[0].numero,
      complemento: this.dadosProjeto[0].complemento,
      cep: this.dadosProjeto[0].cep,
      dataInicio: this.dadosProjeto[0].dataInicio,
      dataFim: this.dadosProjeto[0].dataFim,
      tipoServico: data,
      status: this.dadosProjeto[0].status
    }
    this.projService.createProject(dadosProjeto).then(() => {
      this.utilService.success_msg("Projeto criado com sucesso!");
      this.router.navigate(["projetos"]);
    }).catch((error) => {
      console.error("Erro ao criar projeto: ", error);
    });
  }

}
