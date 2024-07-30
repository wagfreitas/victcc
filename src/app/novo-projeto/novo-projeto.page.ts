import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.page.html',
  styleUrls: ['./novo-projeto.page.scss'],
})
export class NovoProjetoPage {

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

  tipoBloco = "Cerâmico";
  ABloco = 0;
  BBloco = 0;
  largParede = 0;
  altParede = 0;

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["inicial"]);
  }

  toggleInputs(opcao: string, event: any) {
    if (opcao === 'remocao') {
      this.remocaoSelecionada = event.detail.checked;
    }
    else if (opcao === 'nivel') {
      this.nivelSelecionado = event.detail.checked;
    }
    else if (opcao === 'marcacao') {
      this.marcacaoSelecionada = event.detail.checked;
    }
    else if (opcao === 'bloco') {
      this.blocoSelecionado = event.detail.checked;
    }
    else if (opcao === 'radier') {
      this.radierSelecionado = event.detail.checked;
    }
    else if (opcao === 'sapata') {
      this.sapataSelecionada = event.detail.checked;
    }
    else if (opcao === 'estconcreto') {
      this.estConcretoSelecionada = event.detail.checked;
    }
    else if (opcao === 'estmetalica') {
      this.estMetalicaSelecionada = event.detail.checked;
    }
  }

  finalizar() {
    this.router.navigate(["resumo"]);
  }
}
