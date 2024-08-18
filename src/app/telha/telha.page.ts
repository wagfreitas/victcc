import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-telha',
  templateUrl: './telha.page.html',
  styleUrls: ['./telha.page.scss'],
})
export class TelhaPage {

  resultado = "Quantidade:";
  quantidade = 0;
  largtelha = 0;
  unilargtelha = "cm";
  comptelha = 0;
  unicomptelha = "cm";
  largcobertura = 0;
  unilargcobertura = "m";
  compcobertura = 0;
  unicompcobertura = "m";

  constructor(private router: Router) { }

  testar() {
    console.log("Cliquei no botão");
  }

  voltar() {
    this.router.navigate(["calculadora"]);

  }

  calcular() {

    if (this.unilargtelha === "cm") {this.largtelha = this.largtelha/100}
    if (this.unicomptelha === "cm") {this.comptelha = this.comptelha/100}

    this.resultado = "Quantidade: " + String(Math.ceil((this.largcobertura/this.largtelha)*(this.compcobertura/this.comptelha))) + " telhas"

  }

}
