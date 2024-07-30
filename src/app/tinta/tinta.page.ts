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
  tipo = "Acrílica";
  passadas = 2;
  rendi = 0;
  quantidade = "Quantidade:";
  resultado = 0;

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
  }

  calcular() {

    if (this.unialt === "cm"){this.alt = this.alt / 100}
    if (this.unilarg === "cm"){this.larg = this.larg / 100}

    if (this.tipo === "Acrílica") {this.rendi = 100/3.6}

    console.log(this.alt * this.larg, this.passadas, this.rendi)

    this.resultado = Math.ceil(((this.alt * this.larg)*this.passadas) / this.rendi)

    this.quantidade = "Quantidade: " + String(this.resultado) + " L (" + String(Math.ceil(this.resultado / 3.6)) + " latas)";

    }
}
