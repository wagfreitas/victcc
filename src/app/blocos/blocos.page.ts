import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.page.html',
  styleUrls: ['./blocos.page.scss'],
})
export class BlocosPage {

  resultado = "Quantidade:";
  altparede = 0;
  unialtparede = "m";
  largparede = 0;
  unilargparede = "m";
  area = 0;
  tipo = "Bloco cerâmico 14 cm";
  coeficiente = 13;
  quantidade = "";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);
  }

  calcular() {

    let altParedeM = this.convertToM(this.altparede, this.unialtparede);
    let largParedeM = this.convertToM(this.largparede, this.unilargparede);

    this.area = altParedeM * largParedeM;

    if (this.tipo === "Tijolo maciço") {this.coeficiente = 154}
    if (this.tipo === "Tijolo aparente") {this.coeficiente = 154}
    if (this.tipo === "Tijolo laminado") {this.coeficiente = 135}
    if (this.tipo === "Bloco cerâmico 9 cm") {this.coeficiente = 13}
    if (this.tipo === "Bloco cerâmico 14cm") {this.coeficiente = 13}
    if (this.tipo === "Bloco cerâmico 19cm") {this.coeficiente = 13}
    if (this.tipo === "Bloco de concreto 9cm") {this.coeficiente = 13}
    if (this.tipo === "Bloco de concreto 14cm") {this.coeficiente = 13}
    if (this.tipo === "Bloco de concreto 19cm") {this.coeficiente = 13}

    this.quantidade = String(Math.ceil((this.area * this.coeficiente) * 1.1));
    this.resultado = "Quantidade: " + this.quantidade + " unidades";
  }

  convertToM(value: number, unit: string): number {
    switch (unit) {
      case 'm':
        return value * 1;
      case 'cm':
        return value / 100;
      default:
        return value;
    }
  }
}
