import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.page.html',
  styleUrls: ['./blocos.page.scss'],
})
export class BlocosPage {

  resultado = "Quantidade:";
  altbloco = 0;
  unialtbloco = "cm";
  largbloco = 0;
  unilargbloco = "cm";
  altparede = 0;
  unialtparede = "m";
  largparede = 0;
  unilargparede = "m";
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

    let altBlocoCm = this.convertToCm(this.altbloco, this.unialtbloco);
    let largBlocoCm = this.convertToCm(this.largbloco, this.unilargbloco);
    let altParedeCm = this.convertToCm(this.altparede, this.unialtparede);
    let largParedeCm = this.convertToCm(this.largparede, this.unilargparede);

    this.x = Math.ceil(largParedeCm / largBlocoCm);
    this.y = Math.ceil(altParedeCm / altBlocoCm);

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
