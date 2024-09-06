import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-revestimento',
  templateUrl: './revestimento.page.html',
  styleUrls: ['./revestimento.page.scss'],
})
export class RevestimentoPage {

  resultado = "Quantidade:";
  largpeca = 0;
  unilargpeca = "cm";
  comppeca = 0;
  unicomppeca = "cm";
  largura = 0;
  unilarg = "m";
  altura = 0;
  unialt = "m";
  x = 0;
  y = 0;
  quantidade = "";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);

  }

  calcular() {

    let largPecaCm = this.convertToCm(this.largpeca, this.unilargpeca);
    let compPecaCm = this.convertToCm(this.comppeca, this.unicomppeca);
    let larguraCm = this.convertToCm(this.largura, this.unilarg);
    let alturaCm = this.convertToCm(this.altura, this.unialt);

    this.x = Math.ceil(larguraCm / largPecaCm);
    this.y = Math.ceil(alturaCm / compPecaCm);

    this.quantidade = String(Math.round((this.x * this.y) * 1.15));
    this.resultado = "Quantidade: " + this.quantidade + " peças";

  }

  convertToCm(value: number, unit: string): number {
    switch (unit) {
      case 'm':
        return value * 100;
      case 'dm':
        return value * 10;
      case 'cm':
        return value;
      default:
        return value;
    }
  }

}
