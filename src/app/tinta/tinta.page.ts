import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tinta',
  templateUrl: './tinta.page.html',
  styleUrls: ['./tinta.page.scss'],
})
export class TintaPage {

  alt = 0;
  larg = 0;
  unialt = "m";
  unilarg = "m";
  area = 0;
  tipo = " ";
  coeficiente = 0;
  quantidade = "Quantidade:";
  resultado = 0;
  qlatas = "Em latas:";
  tipolata = " ";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);
    this.alt = 0;
    this.larg = 0;
    this.unialt = "m";
    this.unilarg = "m";
    this.area = 0;
    this.tipo = " ";
    this.coeficiente = 0;
    this.quantidade = "Quantidade:";
    this.resultado = 0;
    this.qlatas = "Em latas:";
    this.tipolata = "1L";
  }

  calcular() {

    if (this.unialt === "cm"){this.alt = this.alt / 100}
    if (this.unilarg === "cm"){this.larg = this.larg / 100}

    this.area = this.alt * this.larg;

    if (this.tipo === "Tinta látex") {this.coeficiente = 0.25}
    if (this.tipo === "Verniz acrílico (base água)") {this.coeficiente = 0.125}
    if (this.tipo === "Verniz acrílico (base solvente)") {this.coeficiente = 0.225}
    if (this.tipo === "Tinta esmalte (base água)") {this.coeficiente = 0.25}
    if (this.tipo === "Tinta acrílica") {this.coeficiente = 0.25}
    if (this.tipo === "Epóxi") {this.coeficiente = 0.5}
    if (this.tipo === "Textura acrílica") {this.coeficiente = 0.72}

    this.resultado = this.area * this.coeficiente;

    if (this.resultado <= 1) {this.tipolata = "1L"}
    if (this.resultado > 1) {this.tipolata = "3.6L"}
    if (this.resultado > 3.6) {this.tipolata = "18L"}

    this.quantidade = "Quantidade: " + String(this.resultado) + "L";
    this.qlatas = "Em latas: " + String(Math.ceil(this.resultado / parseFloat(this.tipolata))) + " de " + this.tipolata;

    }
}
