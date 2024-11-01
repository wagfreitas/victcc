import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-telha',
  templateUrl: './telha.page.html',
  styleUrls: ['./telha.page.scss'],
})
export class TelhaPage {

  resultado = "Quantidade:";
  largura = 0;
  unilarg = "m";
  comprimento = 0;
  unicomp = "m";
  area = 0;
  tipo = " ";
  coeficiente = 0;
  quantidade = "";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);
    this.resultado = "Quantidade:";
    this.largura = 0;
    this.unilarg = "m";
    this.comprimento = 0;
    this.unicomp = "m";
    this.area = 0;
    this.tipo = " ";
    this.coeficiente = 0;
    this.quantidade = "";
  }

  calcular() {

    let larguraM = this.convertToM(this.largura, this.unilarg);
    let comprimentoM = this.convertToM(this.comprimento, this.unicomp);

    this.area = larguraM * comprimentoM;

    if (this.tipo === "Telha de barro") { this.coeficiente = 16 }
    if (this.tipo === "Telha em CRFS") { this.coeficiente = 0.86 }
    if (this.tipo === "Telha em fibra vegetal") { this.coeficiente = 0.84 }
    if (this.tipo === "Telha ondulada translúcida") { this.coeficiente = 0.43 }
    if (this.tipo === "Telha em poliéster reforçado") { this.coeficiente = 0.86 }
    if (this.tipo === "Telha de vidro") { this.coeficiente = 1.05 }
    if (this.tipo === "Telha tipo sanduíche") { this.coeficiente = 1.05 }

    this.quantidade = String(Math.ceil(this.area * this.coeficiente));
    this.resultado = "Quantidade: " + this.quantidade + " peças";
  }

  convertToM(value: number, unit: string): number {
    switch (unit) {
      case 'm':
        return value;
      case 'cm':
        return value / 100;
      default:
        return value;
    }
  }

}
