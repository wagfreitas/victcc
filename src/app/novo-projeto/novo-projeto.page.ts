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
import { getAuth } from 'firebase/auth';





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
                  "descricao": "Quantidade",
                  "valor": 0
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
              "medidas": [
                {
                  "descricao": "Quantidade",
                  "valor": "0"
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
              "medidas": [
                {
                  "descricao": "Volume",
                  "valor": "0"
                }
              ]
            },
            {
              "ordem": 2,
              "duracao": 3,
              "descricao": "Aterro",
              "medidas": [
                {
                  "descricao": "Volume",
                  "valor": "0"
                }
              ]
            },
            {
              "descricao": "Empresa tercerizada",
              "regra": "C",
              "ordem": 2,
              "duracao": 1,
              "medidas": [
                {
                  "descricao": "Volume",
                  "valor": "0"
                }
              ]
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
              "duracao": 3,
              "descricao": "Radier",
              "medidas": [
                {
                  "descricao": "Área",
                  "valor": "0"
                },
                {
                  "descricao": "Altura",
                  "valor": "0"
                }
              ]
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
              "descricao": "Sapata",
              "medidas": [
                {
                  "descricao": "Volume",
                  "valor": "0"
                },
                {
                  "descricao": "Quantidade",
                  "valor": "0"
                },
                {
                  "descricao": "Tipo",
                  "valor": ["Isolada", "Corrida", "Grupo"]
                }
              ]
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
              "ordem": 3,
              "medidas": [
                {
                  "descricao": "Comprimento",
                  "valor": "0"
                },
                {
                  "descricao": "Diâmetro",
                  "valor": "0"
                },
                {
                  "descricao": "Quantidade",
                  "valor": "0"
                }
              ]
            }
          ]
        }
      ],
      "descricao": "Fundação"
    }
  ];

  nomeProjeto = ""

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
      this.modelData = data
    });
    this.openModal()
  }



  getMedidaLabel(medida: any): string {
    return `${medida.descricao}`;
  }

  toggleProcess(processo: any) {
    processo.expanded = !processo.expanded;
  }

  toggleAtividade(atividade: any) {
    atividade.expanded = !atividade.expanded;

  }

  async confirmar() {
    // Mapeando as etapas, processos e atividades que foram selecionados e preenchidos
    const result = this.etapas.map(etapa => ({
      descricao: etapa.descricao,
      Processo: etapa.Processo.filter((processo: { expanded: any; }) => processo.expanded).map((processo: { descricao: any; atividade: any[]; }) => ({
        descricao: processo.descricao,
        atividade: processo.atividade.filter(atividade => atividade.expanded).map(atividade => ({
          descricao: atividade.descricao,
          duracao: atividade.duracao,
          material: atividade.material,
          ordem: atividade.ordem,
          regra: atividade.regra,
          medidas: atividade.medidas.map((medida: { valor: any; }) => ({
            ...medida,
            valor: medida.valor || '0'
          }))
        }))
      }))
    }));

    // Adicionar o ID do usuário ao registro
    const projeto = {
      etapas: result,
      timestamp: new Date()
    };

    const cleanedProjeto = this.projService.removeUndefinedFields(projeto);

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

  getSelectedItems() {
    const selectedItems = this.categories?.map(category => ({
      category: category.name,
      items: category.items,
    }));
  }


  voltar() {
    this.router.navigate(["inicial"]);
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
      tipoServico: data,
      status: this.dadosProjeto[0].status
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


}
