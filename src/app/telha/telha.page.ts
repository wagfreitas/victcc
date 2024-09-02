import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-telha',
  templateUrl: './telha.page.html',
  styleUrls: ['./telha.page.scss'],
})
export class TelhaPage {

  resultado = "Quantidade:";
  largtelha = 0;
  unilargtelha = "cm";
  comptelha = 0;
  unicomptelha = "cm";
  largcobertura = 0;
  unilargcobertura = "m";
  compcobertura = 0;
  unicompcobertura = "m";
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

    let largTelhaCm = this.convertToCm(this.largtelha, this.unilargtelha);
    let compTelhaCm = this.convertToCm(this.comptelha, this.unicomptelha);
    let largCoberturaCm = this.convertToCm(this.largcobertura, this.unilargcobertura);
    let compCoberturaCm = this.convertToCm(this.compcobertura, this.unicompcobertura);

    this.x = Math.ceil(largCoberturaCm / largTelhaCm);
    this.y = Math.ceil(compCoberturaCm / compTelhaCm);

    this.quantidade = String(Math.round((this.x * this.y) * 1.1));
    this.resultado = "Quantidade: " + this.quantidade + " blocos";

    console.log(this.x);
    console.log(this.y);
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
